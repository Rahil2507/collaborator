"use client"

import { useEffect } from "react"
import axios from "axios"
import * as z from "zod"
import qs from "query-string"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { useModal } from "@/hooks/use-modal-store"

const formSchema = z.object({
  id: z.string().min(1, { message: "User Id is required." })
})

export const UsersModal = () => {
  const router = useRouter()
  const params = useParams()

  const { isOpen, onClose, type, data } = useModal()

  const isModalOpen = isOpen && type === "chooseUser"

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      id: "", 
    }
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: "/api/code/",
        query: {
          serverId: params?.serverId,
          userId: values.id
        }
      })

      await axios.post(url)
      form.reset()
      router.refresh()
      handleClose()
    } catch (error) {
      console.log(error)
    }    
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">Add User</DialogTitle>
        </DialogHeader>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField control={form.control} name="id" render={({field}) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">User Id</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} placeholder="Enter Github User ID (ex: facebook)" className="bg-zinc-300/50 border-0 text-black focus-visible:ring-0 focus-visible:ring-offset-0"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
                <Button variant="primary" disabled={isLoading}>Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}