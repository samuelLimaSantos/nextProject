import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';

interface IProduct {
  id: number;
  title: string;
  price: number;
  category_id: string;
  slug: string;
}

interface Categories {
  products: IProduct[];
}

const Categories = ({ products }: Categories) => {
  const routes = useRouter();

  if (routes.isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>{routes.query.slug}</h1>
      <ul>
        {products.map(product => {
          return <li key={product.id}>{product.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default Categories;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`http://localhost:3333/categories`);
  const categories = await response.json();

  const paths = categories.map(category => {
    return {
      params: { slug: category.id },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Categories> = async context => {
  const { slug } = context.params;

  const response = await fetch(
    `http://localhost:3333/products?category_id=${slug}`,
  );
  const products = await response.json();

  return {
    props: {
      products,
    },
    revalidate: 60,
  };
};
