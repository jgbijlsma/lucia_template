import Container from "@/components/Container";
import NavBar from "@/components/NavBar";
import { ChildrenProps } from "@/types/ChildrenProps";
import "@/style/global.css";

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html>
      <body>
        <Container>
          <NavBar />
          {children}
        </Container>
      </body>
    </html>
  );
}
