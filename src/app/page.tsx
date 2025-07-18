import CalculationForm from "./ui/CalculationForm";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <div className="flex gap-4 items-center flex-col">
          Calculate your returns
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
