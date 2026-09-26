import { useState } from "react";
import { ArrowRight, MessageSquareText, Sparkles, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { icon: MessageSquareText, tag: "STEP 01", title: "Describe your idea", text: "Tell Buildora AI about your business, style and goals in plain words." },
  { icon: Sparkles, tag: "STEP 02", title: "Watch it build", text: "Buildora AI designs your pages, writes the copy and shows a live preview you can refine." },
  { icon: Rocket, tag: "STEP 03", title: "Launch and grow", text: "Pick a plan and domain, then go live — ready for customers in minutes." },
];

export function Guide({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const s = steps[i] ?? steps[0]!;
  const Icon = s.icon;
  const last = i === steps.length - 1;
  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-lg items-center px-5 py-12">
      <div key={i} className="animate-rise w-full rounded-3xl border border-border gunmetal-surface p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground">{s.tag} / 03</span>
          <button onClick={onDone} className="text-xs text-muted-foreground hover:text-foreground">Skip</button>
        </div>
        <div className="mt-8 grid size-16 place-items-center rounded-2xl metallic-button"><Icon className="size-7" /></div>
        <h1 className="mt-6 font-display text-3xl font-bold metallic-text">{s.title}</h1>
        <p className="mt-3 text-muted-foreground">{s.text}</p>
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex gap-2">
            {steps.map((_, n) => (
              <button key={n} aria-label={`Step ${n + 1}`} onClick={() => setI(n)} className={`h-1.5 rounded-full transition-all ${n === i ? "w-8 bg-metal-bright" : "w-3 bg-gunmetal"}`} />
            ))}
          </div>
          <Button size="lg" onClick={() => (last ? onDone() : setI(i + 1))}>
            {last ? "Start building" : "Next"} <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
