import Link from "next/link";
import { CreateForm } from "@/components/create-form";

export default function CreatePage() {
  return <section className="narrow-page"><Link href="/" className="back-link">← Go Back</Link><h1 className="form-title">Create Lecture</h1><CreateForm /></section>;
}
