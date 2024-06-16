"use client"

import qs from "query-string";
import axios from "axios";
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github.css';  
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);


import { getGithubFile } from "@/lib/get-github-file"

import { CodeHeader } from "@/components/code/code-header"
import { redirect, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { BackButton } from '@/components/back-button';
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";

interface RepoProps {
  params: {
    repoName: string
    githubUser: string
    serverId: string
    filePath: string
  }
}

interface ReposType {
  name: string
  path: string
  type: string 
  content: string 
  url: string 
  
}


const RepoPage = async({params}: RepoProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [repoFile, setRepoFile] = useState<any>({})
  const [codeContent, setCodeContent] = useState("Loading")
  const [channelId, setChannelId] = useState<any>(undefined)
  const [navigate, setNavigate] = useState(true)

  const searchParams = useSearchParams()
  const path: any = searchParams?.get("path")
  

  useEffect(() => {
    getId()
    fetchGitHubFileContent();
    
  }, []);

  async function getId () {
    try {
      const url = qs.stringifyUrl({
        url: "/api/channels/",
        query: {
          serverId: params?.serverId,
        }
      })

      const channel = await axios.get(url)
    
      setChannelId(channel.data.id)  
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchGitHubFileContent() {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${params.githubUser}/${params.repoName}/contents/${path}`
      );
      if (response.ok) {
        const data:ReposType = await response.json();
        if (data.content) {
          setRepoFile(data)

          // const decodedContent = atob(data.content);
          
          // const highlightedContent = hljs.highlight(
          //   decodedContent,
          //   { language: 'javascript' }
          //   ).value

          // const container = document.getElementById("container");
          // if (container) container.innerHTML = highlightedContent

          // setCodeContent(highlightedContent);

          const contentList = data.content.split("\n")

          const contentArr: string[] = []

          contentList.map(content => {
            const text = atob(content)
            const highlighted = hljs.highlight(
                text,
                { language: 'javascript' }
                ).value
            contentArr.push(highlighted)
          })
          
          const content = contentArr.join("<br/>")

          const container = document.getElementById("container");
          if (container) container.innerHTML = content

          setCodeContent(content);


        }
      } else {
        console.error('Error fetching file content:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false)
    }
  }
  
  async function colab () {
    try {
      const url = qs.stringifyUrl({ 
        url: '/api/socket/messages',
        query: {channelId: channelId, serverId: params.serverId},
      });

      await axios.post(url, {content: codeContent, fileUrl: 'code.code'});

      setNavigate(false)
      // redirect(`/servers/${params.serverId}/channels/${channelId}`)
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full">
      <CodeHeader serverId={params.serverId} label={params.repoName} />
      <div className='flex w-full justify-between items-center'>
        <BackButton />
        <p className='flex-wrap text-sm md:text-lg text-zinc-700 dark:text-zinc-300'> {isLoading ? "Loading....." : repoFile.path}</p>
        <button onClick={colab} className="m-2 px-5 py-3 rounded-md bg-zinc-300 dark:bg-zinc-700/50 hover:bg-zinc-700/10 dark:hover:bg-zinc-700 ">
          <p className="line-clamp-1 font-semibold text-md text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">Colab</p>
        </button>
      </div>
      <div className='flex justify-center'> 
        <div hidden={isLoading} className='w-full md:w-96 bg-black m-5 p-5 pt-10 rounded-lg'>
          {navigate ? 
          <div id='container' className='text-xs md:text-[15px]'>
          </div>
          : <p className="text-center font-semibold text-md text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">Navigate to General Channel</p>
          }
        </div>
      </div>
    </div>
  )
}

export default RepoPage