import { Container } from "@/components/ui/container";

// Thin affiliation strip above the masthead.
export function TopBar({ affiliation }: { affiliation: string }) {
  return (
    <div className="bg-blue-dark text-white">
      <Container>
        <p className="py-2 text-center text-xs tracking-wide text-line-cool sm:text-left">
          {affiliation}
        </p>
      </Container>
    </div>
  );
}
