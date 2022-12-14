import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';
import Category from './Category';

const Categories = () => {
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetch('https://motor-mania-server.vercel.app/categories')
            .then(res => res.json())
    })
    console.log(categories);

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <section>
            <h2 className='text-black font-bold text-2xl md:text-3xl lg:text-5xl mb-4 ml-10'>Product Categories</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-5'>
                {
                    categories.map(category => <Category
                        key={category._id}
                        category={category}
                    ></Category>)
                }
            </div>
        </section>
    );
};

export default Categories;