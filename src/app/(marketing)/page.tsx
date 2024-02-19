import { ReactNode } from "react";
import { Icons } from "~/components/icons";
import { SITE_CONFIG } from "~/config/site";

const Feature = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon?: ReactNode;
}) => {
  return (
    <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
      {icon}
      <div className="space-y-2">
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            {SITE_CONFIG.name}
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            {SITE_CONFIG.description}
          </p>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          {/* <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"></p> */}
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <Feature
              title="Manage"
              description="Store all of your brand and campaign assets (image, text, video) in 1 place."
              icon={<Icons.files className="h-12 w-12" />}
            />
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <Feature
              title="Version Control"
              description="Make changes without fear and go back to previous states."
              icon={<Icons.history className="h-12 w-12" />}
            />
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <Feature
              title="Multiplayer"
              description="Collaborate with colleagues in real-time."
              icon={<Icons.users className="h-12 w-12" />}
            />
          </div>
        </div>
      </section>
    </>
  );
}
