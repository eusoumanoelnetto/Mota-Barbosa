
import React, { useState, useEffect } from 'react';
import { LandListing } from '../types';

interface LandFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: LandListing | null;
}

// Importante: Definir InputField FORA do componente LandForm
// para manter a identidade do componente entre renders e não perder o foco a cada tecla digitada
const InputField: React.FC<{
  name: string;
  label: string;
  value: string;
  required?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ name, label, value, required = false, placeholder, autoFocus, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      required={required}
      placeholder={placeholder}
      autoFocus={autoFocus}
      onChange={onChange}
      className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
    />
  </div>
);

const LandForm: React.FC<LandFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    fullAddress: '',
    price: '',
    tags: '',
    features: '',
    description: '',
    area: '',
    solarPosition: '',
    propertyType: '',
    images: '',
    code: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        location: initialData.location,
        fullAddress: initialData.fullAddress,
        price: initialData.price,
        tags: initialData.tags.join(', '),
        features: initialData.features.join(', '),
        description: initialData.description,
        area: initialData.area,
        solarPosition: initialData.solarPosition,
        propertyType: initialData.propertyType,
        images: initialData.images.join(', '),
        code: initialData.code,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      tags: formData.tags.split(',').map(s => s.trim()).filter(Boolean),
      features: formData.features.split(',').map(s => s.trim()).filter(Boolean),
      images: formData.images.split(',').map(s => s.trim()).filter(Boolean),
      imageUrl: formData.images.split(',').map(s => s.trim()).filter(Boolean)[0] || '', // backward compatibility
    };

    if (initialData) {
        onSubmit({ ...processedData, id: initialData.id });
    } else {
        onSubmit(processedData);
    }
  };
  
  // (removido) Listener de propagação — não é necessário com onChange direto

  return (
    <main className="bg-white py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
          {initialData ? 'Editar Terreno' : 'Adicionar Novo Terreno'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-slate-50 p-8 rounded-xl shadow-lg">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField name="title" label="Título do Anúncio" value={formData.title} required autoFocus onChange={handleChange} />
            <InputField name="code" label="Código do Imóvel" value={formData.code} required placeholder="Ex: 7007" onChange={handleChange} />
          </div>

          <InputField name="price" label="Preço" value={formData.price} required placeholder="Ex: R$ 120.000" onChange={handleChange} />
          <InputField name="location" label="Localização (Cidade/Estado)" value={formData.location} required placeholder="Ex: Alter do Chão/PA" onChange={handleChange} />
          <InputField name="fullAddress" label="Endereço Completo" value={formData.fullAddress} required placeholder="Ex: Rua das Flores, 123, Bairro, Cidade - UF, CEP" onChange={handleChange} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField name="area" label="Área Total" value={formData.area} required placeholder="Ex: 500m²" onChange={handleChange} />
            <InputField name="solarPosition" label="Posição Solar" value={formData.solarPosition} required placeholder="Ex: Nascente" onChange={handleChange} />
            <InputField name="propertyType" label="Tipo de Imóvel" value={formData.propertyType} required placeholder="Ex: Lote/Terreno" onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
            ></textarea>
          </div>

          <InputField name="features" label="Características (separadas por vírgula)" value={formData.features} required placeholder="Ex: Plano, Murado, Pronto para construir" onChange={handleChange} />
          <InputField name="tags" label="Tags (separadas por vírgula)" value={formData.tags} required placeholder="Ex: Investimento, Perto da praia" onChange={handleChange} />
          <InputField name="images" label="URLs das Imagens (separadas por vírgula)" value={formData.images} required placeholder="https://exemplo.com/imagem1.jpg, https://exemplo.com/imagem2.jpg" onChange={handleChange} />

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="bg-slate-200 text-slate-800 font-bold py-2 px-6 rounded-lg hover:bg-slate-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-emerald-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-emerald-600 transition-colors shadow"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LandForm;
