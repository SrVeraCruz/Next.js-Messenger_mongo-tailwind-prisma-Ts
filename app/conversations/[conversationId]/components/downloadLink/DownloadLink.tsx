'use client'

interface DownloadLinkProps {
  src: string,
  filename : string,
  children: React.ReactNode
}

export default function DownloadLink({
  children,
  filename,
  src
}: DownloadLinkProps ) {
  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      link.click();
      
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Erro ao baixar a imagem:', error);
    }
  };

  return (
    <a onClick={handleDownload}>
      <span className="sr-only">Download</span>
      {children}
    </a>
  )
}