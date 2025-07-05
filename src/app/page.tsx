import CalculationForm from "./ui/CalulationForm";

export default function Home() {
  /**
   * Start deposit amount (e.g. $10,000)
   * Interest rate (e.g. 1.10%)
   * Investment term (e.g. 3 years)
   * Interest paid (monthly, quarterly, annually, at maturity)
   * And produces as output:
   * Final balance (e.g. $10,330 on the above inputs, interest paid at maturity)
   */
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <div className="flex gap-4 items-center flex-col">
          Hello world
          <br />
          <CalculationForm />
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Created by Irene Lee
      </footer>
    </div>
  );
}
