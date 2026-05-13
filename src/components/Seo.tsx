import { Head } from "vite-react-ssg";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
};

const SITE_NAME = "Canada Transit Visualizer";
const SITE_URL = "https://canada-transit-visualizer.pages.dev";

export default function Seo({ title, description, path = "" }: SeoProps) {
  const fullTitle = `${title} · ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
}
