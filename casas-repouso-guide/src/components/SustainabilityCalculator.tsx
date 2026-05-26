import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import type { Facility } from "../data/facilities";
import { formatBrl } from "../utils/money";
import {
  getRepousoMonthly,
  simulateSustainability,
  type OccupancyType,
} from "../utils/sustainability-calc";
import { SimulatorTimeline } from "./SimulatorTimeline";

type Props = {
  facilities: Facility[];
};

function numOrZero(v: string): number {
  const n = Number(v.replace(",", "."));
  return Number.isFinite(n) ? Math.max(0, n) : 0;
}

export function SustainabilityCalculator({ facilities }: Props) {
  const [principal, setPrincipal] = useState("200000");
  const [annualRate, setAnnualRate] = useState("10");
  const [taxRate, setTaxRate] = useState("15");
  const [salary1, setSalary1] = useState("4000");
  const [salary2, setSalary2] = useState("1800");
  const [rentAtuba, setRentAtuba] = useState("2000");
  const [healthOther, setHealthOther] = useState("1000");
  const [repousoOverride, setRepousoOverride] = useState("6000");
  const [facilityId, setFacilityId] = useState("");
  const [occupancy, setOccupancy] = useState<OccupancyType>("individual");
  const [useMaxPrice, setUseMaxPrice] = useState(true);

  const repousoMonthly = numOrZero(repousoOverride || "6000");

  const inputs = useMemo(
    () => ({
      principal: numOrZero(principal),
      annualRatePct: numOrZero(annualRate),
      taxOnReturnsPct: numOrZero(taxRate),
      monthlySalary1: numOrZero(salary1),
      monthlySalary2: numOrZero(salary2),
      monthlyRentAtuba: numOrZero(rentAtuba),
      monthlyHealthAndOther: numOrZero(healthOther),
      monthlyRepouso: repousoMonthly * 2,
    }),
    [principal, annualRate, taxRate, salary1, salary2, rentAtuba, healthOther, repousoMonthly]
  );

  const result = useMemo(() => simulateSustainability(inputs), [inputs]);

  const handleFacilityChange = (id: string) => {
    setFacilityId(id);
    if (!id) {
      setRepousoOverride("6000");
      return;
    }
    const f = facilities.find((x) => x.id === id);
    const parsed = getRepousoMonthly(f, occupancy, useMaxPrice);
    if (parsed.value != null) {
      setRepousoOverride(String(Math.round(parsed.value)));
    }
  };

  return (
    <section className="calc-section panel" aria-labelledby="calc-title">
      <div className="section-head">
        <span className="section-icon" aria-hidden>
          <Calculator size={18} />
        </span>
        <div>
          <h2 id="calc-title">Simulador</h2>
          <p className="section-desc calc-section-desc">
            Quanto tempo o patrimônio cobre os gastos, com rendimento e salários
          </p>
        </div>
      </div>

      <div className="calc-form-simple">
        <div className="calc-row">
          <h3 className="calc-row-title">Investimento</h3>
          <div className="calc-row-fields">
            <label className="calc-label">
              Montante (R$)
              <input
                type="number"
                min={0}
                step={1000}
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
              />
            </label>
            <label className="calc-label">
              Juros a.a. (%)
              <input
                type="number"
                min={0}
                step={0.1}
                value={annualRate}
                onChange={(e) => setAnnualRate(e.target.value)}
              />
            </label>
            <label className="calc-label">
              Imposto (%)
              <input
                type="number"
                min={0}
                max={100}
                step={0.5}
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
              />
            </label>
          </div>
          <div className="calc-investment-yield">
            <span className="calc-investment-yield-title">Renda do investimento (cálculo)</span>
            <div className="calc-investment-yield-grid">
              <div>
                <em>Bruta / mês</em>
                <strong>{formatBrl(result.monthlyGrossReturn)}</strong>
              </div>
              <div>
                <em>Imposto / mês</em>
                <strong>{formatBrl(result.monthlyTax)}</strong>
              </div>
              <div className="calc-investment-yield-net">
                <em>Líquida / mês</em>
                <strong>{formatBrl(result.monthlyNetReturn)}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="calc-row">
          <h3 className="calc-row-title">Renda</h3>
          <div className="calc-row-fields">
            <label className="calc-label">
              Salário 1 (R$)
              <input
                type="number"
                min={0}
                step={100}
                value={salary1}
                onChange={(e) => setSalary1(e.target.value)}
              />
            </label>
            <label className="calc-label">
              Salário 2 (R$)
              <input
                type="number"
                min={0}
                step={100}
                value={salary2}
                onChange={(e) => setSalary2(e.target.value)}
              />
            </label>
            <label className="calc-label">
              Aluguel casa Atuba (R$)
              <input
                type="number"
                min={0}
                step={100}
                value={rentAtuba}
                onChange={(e) => setRentAtuba(e.target.value)}
                title="Renda do aluguel da residência da família no Atuba"
              />
            </label>
          </div>
        </div>

        <div className="calc-row">
          <h3 className="calc-row-title">Despesas / mês</h3>
          <div className="calc-row-fields">
            <label className="calc-label">
              Remédios + outros (R$)
              <input
                type="number"
                min={0}
                step={50}
                value={healthOther}
                onChange={(e) => setHealthOther(e.target.value)}
              />
            </label>
            <label className="calc-label">
              Mensalidade repouso (R$ / pessoa)
              <input
                type="number"
                min={0}
                step={100}
                value={repousoOverride}
                onChange={(e) => setRepousoOverride(e.target.value)}
              />
              <span className="calc-label-hint">
                × 2 idosos = {formatBrl(repousoMonthly * 2)}/mês na simulação
              </span>
            </label>
          </div>
        </div>

        <details className="calc-details">
          <summary>Casa da lista (opcional)</summary>
          <div className="calc-details-body">
            <label className="calc-label">
              Selecionar casa
              <select
                value={facilityId}
                onChange={(e) => handleFacilityChange(e.target.value)}
              >
                <option value="">Valor manual acima</option>
                {facilities.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="calc-occupancy">
              <label className="calc-radio">
                <input
                  type="radio"
                  name="occupancy"
                  checked={occupancy === "individual"}
                  onChange={() => setOccupancy("individual")}
                />
                Individual
              </label>
              <label className="calc-radio">
                <input
                  type="radio"
                  name="occupancy"
                  checked={occupancy === "casal"}
                  onChange={() => setOccupancy("casal")}
                />
                Casal
              </label>
              <label className="calc-check">
                <input
                  type="checkbox"
                  checked={useMaxPrice}
                  onChange={(e) => setUseMaxPrice(e.target.checked)}
                />
                Preço mais alto da faixa
              </label>
            </div>
          </div>
        </details>
      </div>

      <div className={`calc-result ${result.infinite ? "calc-result--ok" : ""}`}>
        <SimulatorTimeline
          months={result.months}
          infinite={result.infinite}
          timeline={result.timeline}
          initialBalance={inputs.principal}
        />

        <div className="calc-summary-cards">
          <div className="calc-summary-card">
            <span>Entradas / mês</span>
            <strong>{formatBrl(result.monthlyTotalInflow)}</strong>
          </div>
          <div className="calc-summary-card">
            <span>Despesas / mês</span>
            <strong>{formatBrl(result.monthlyExpenses)}</strong>
          </div>
          <div
            className={`calc-summary-card ${result.monthlyNetBurn > 0 ? "calc-summary-card--warn" : "calc-summary-card--ok"}`}
          >
            <span>Uso do patrimônio / mês</span>
            <strong>
              {result.monthlyNetBurn > 0
                ? formatBrl(result.monthlyNetBurn)
                : "Nenhum"}
            </strong>
          </div>
        </div>

        {result.warning && (
          <p className="calc-result-warning">{result.warning}</p>
        )}
      </div>
    </section>
  );
}
