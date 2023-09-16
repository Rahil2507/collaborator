"use client"

import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github.css';  
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);


import { getGithubFile } from "@/lib/get-github-file"

import { CodeHeader } from "@/components/code/code-header"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { BackButton } from '@/components/back-button';

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
  const [codeContent, setCodeContent] = useState<any>(undefined)

  const searchParams = useSearchParams()
  const path: any = searchParams?.get("path")
  

  useEffect(() => {
    // Create a function to fetch and decode the content
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

            setCodeContent(contentList);


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

    fetchGitHubFileContent();
    
  }, []);
  

  return (
    <div className="w-full">
      <CodeHeader serverId={params.serverId} label={params.repoName} />
      <BackButton />
      <p className='text-center text-lg text-zinc-700 dark:text-zinc-300'> {isLoading ? "Loading....." : repoFile.path}</p>

      <div className='flex justify-center'> 
        <div className='w-full md:w-96 bg-black m-5 p-5 pt-10'>
          <div id='container'>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RepoPage