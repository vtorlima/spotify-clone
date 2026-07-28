import heroImage from "../../assets/home-hero.png";

export function HomeHeroBanner() {
  return (
    <section className="grid overflow-hidden rounded-lg bg-background-elements md:grid-cols-[2fr_1fr]">
      <img
        src={heroImage}
        alt="Destaque da Home"
        className="h-full min-h-[220px] w-full object-cover"
      />

      <div className="flex flex-col justify-center gap-4 p-6">
        <p className="text-12px font-semibold uppercase text-text-subdued">
          Destaque
        </p>

        <h2 className="text-[28px] font-bold leading-tight text-text-base">
          CATI Jr - Consultoria e Aplicações em TI
        </h2>

        <p className="text-16px text-text-subdued">
          A CATI Jr. é a empresa júnior de computação da UFSCar. Há mais de 30 anos, desenvolve projetos de tecnologia com foco em inovação. Sem fins lucrativos, busca desenvolver seus membros, fortalecer o empreendedorismo e contribuir com organizações públicas e privadas.
        </p>
      </div>
    </section>
  );
}
