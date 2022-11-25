import { useQuery } from '@tanstack/react-query';
import Category from './Category';

const Categories = () => {
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetch('http://localhost:5000/categories')
            .then(res => res.json())
    })
    console.log(categories);
    return (
        <section>
            <h2 className='text-center text-primary font-bold text-2xl md:text-4xl lg:text-5xl mb-4'>Product Categories</h2>
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