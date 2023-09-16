import { CodeHeader } from "@/components/code/code-header";
import { CodeUser } from "@/components/code/code-user";

interface CodePageProps {
  params:{
    serverId: string
  }
}

const CodePage = async ({params}: CodePageProps) => {

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full max-h-screen">
      <CodeHeader serverId={params.serverId} label="Code" />
      <CodeUser serverId={params.serverId} />
    </div>
  )
};

export default CodePage;
