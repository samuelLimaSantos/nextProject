import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents';
import Link from 'next/link';
import PrismicDOM from 'prismic-dom';
import { client } from '../../lib/prismic';

interface Categories {
  category: Document;
  products: Document[];
}

const Categories = ({ products, category }: Categories) => {
  const routes = useRouter();

  if (routes.isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>{PrismicDOM.RichText.asText(category.data.title)}</h1>
      <ul>
        {products.map(product => {
          return (
            <li key={product.id}>
              <Link href={`/products/${product.uid}`}>
                <a>{PrismicDOM.RichText.asText(product.data.title)}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await client().query([
    Prismic.Predicates.at('document.type', 'category'),
  ]);

  const paths = categories.results.map(category => {
    return {
      params: { slug: category.uid },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Categories> = async context => {
  const { slug } = context.params;

  const category = await client().getByUID('category', String(slug), {});

  const products = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
    Prismic.Predicates.at('my.product.category', category.id),
  ]);

  return {
    props: {
      category,
      products: products.results,
    },
    revalidate: 60,
  };
};
