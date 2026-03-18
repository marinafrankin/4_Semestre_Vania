import { useNavigate } from 'react-router-dom';
import LivroForm from '../Components/LivroForm';
import { createLivro } from '../../api/livroapi';

export default function CreateBook() {
    const navigate = useNavigate();

    const handleCreate = async (formData) => {
        try {
            await createLivro(formData);
            navigate('/');
        } 
        catch (error) {
            console.error("Erro ao criar o livro: ", error);
            alert("Erro ao criar o livro!");
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-2xl mx-auto pt-8 px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Novo Livro</h2>
                <LivroForm onSubmit={handleCreate} />
            </div>
        </div>
    );
}