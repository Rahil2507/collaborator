export async function getGithubFile(id: string, name: string, dir: string) {
  const response = await fetch(`https://api.github.com/repos/${id}/${name}/contents/${dir}`, {
    headers: { Authorization: `Bearer ${process.env.GITHUB_APP_KEY}`},
    next: { revalidate: 60 }
  }
  );
  const contents = await response.json();
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return contents;
}

