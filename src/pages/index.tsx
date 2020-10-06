import { GetServerSideProps } from 'next';
import SEO from '../components/SEO';
import { Title } from '../styles/pages/Home';

interface IProduct {
  id: number;
  title: string;
  price: number;
  category_id: string;
  slug: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  const sum = async () => {
    const { math } = (await import('../pages/lib/math')).default;

    alert(math(3, 2));
  };

  return (
    <div>
      <SEO
        title="DevCommerce, your best e-commerce "
        shouldExcludeTitleSuffix
      />
      <section>
        <Title>Hello Rocketseat</Title>

        <ul>
          {recommendedProducts.map(product => {
            return <li key={product.id}>{product.title}</li>;
          })}
        </ul>

        <button type="button" onClick={sum}>
          Soma
        </button>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.API_URL}/recommended`);
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts,
    },
  };
};
