import "../globals.css"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<html lang="en">
    <body
    >
      <main className="w-full">
        {children}
      </main>
    </body>
  </html>)
}