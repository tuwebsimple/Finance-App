import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StorageService } from '../services/storage';
import { Category } from '../types';

const ICONS = ['restaurant', 'directions_car', 'home', 'shopping_cart', 'movie', 'pets', 'school', 'medical_services', 'fitness_center', 'flight', 'work', 'savings'];

const AddTransaction: React.FC = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<'expense' | 'income'>('expense');
  
  const [categories, setCategories] = useState<Category[]>([]);
  
  // New Category Modal State
  const [showNewCatModal, setShowNewCatModal] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('category');

  useEffect(() => {
    setCategories(StorageService.getCategories());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description || !categoryId) return;

    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    const finalAmount = parseFloat(amount);
    
    StorageService.saveTransaction({
      id: Date.now().toString(),
      title: description,
      categoryId: category.id,
      categoryName: category.name,
      amount: type === 'expense' ? -Math.abs(finalAmount) : Math.abs(finalAmount),
      date: date,
      type: type,
      icon: category.icon,
      iconColor: category.color
    });

    navigate('/home');
  };

  const handleAddCategory = () => {
    if(!newCatName) return;
    const newCat: Category = {
        id: `cat_${Date.now()}`,
        name: newCatName,
        icon: newCatIcon,
        color: `bg-indigo-100 text-indigo-500`, // Default color for custom cats
        type: 'both'
    };
    StorageService.saveCategory(newCat);
    setCategories([...categories, newCat]);
    setCategoryId(newCat.id); // Select it automatically
    setShowNewCatModal(false);
    setNewCatName('');
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden flex flex-col p-6">
       {/* Background Ambient */}
       <div className="fixed top-[-10%] right-[-10%] w-[350px] h-[350px] bg-indigo-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 z-0"></div>
       <div className="fixed bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-pink-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 z-0"></div>

      <header className="relative z-10 flex items-center justify-between mb-6 pt-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-black/5 transition-colors">
          <span className="material-icons-round text-gray-600">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold tracking-tight text-gray-900">
            {type === 'expense' ? 'Nuevo Gasto' : 'Nuevo Ingreso'}
        </h1>
        <button 
            onClick={() => setType(type === 'expense' ? 'income' : 'expense')}
            className="px-3 py-1 rounded-full bg-white/50 text-xs font-bold border border-gray-200 uppercase tracking-wide"
        >
          Cambiar a {type === 'expense' ? 'Ingreso' : 'Gasto'}
        </button>
      </header>

      {/* Amount Display */}
      <div className="glass-panel bg-white/60 rounded-[2rem] p-8 mb-6 shadow-sm text-center relative overflow-hidden border border-white/80 z-10">
        <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${type === 'expense' ? 'from-orange-500 to-red-500' : 'from-green-500 to-emerald-500'}`}></div>
        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Monto</label>
        <div className="flex items-center justify-center relative">
          <span className="text-4xl font-light text-gray-400 mr-2">$</span>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-transparent border-none text-6xl font-bold text-gray-900 placeholder-gray-200 focus:ring-0 w-full text-center p-0 appearance-none m-0"
            placeholder="0.00"
          />
          <span className="absolute right-0 bottom-2 text-sm font-bold text-gray-400">MXN</span>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-5 flex-grow relative z-10" onSubmit={handleSubmit}>
        
        {/* Category */}
        <div className="group">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-600 ml-1">Categoría</label>
            <button type="button" onClick={() => setShowNewCatModal(true)} className="text-xs font-bold text-indigo-600 flex items-center">
                <span className="material-icons-round text-sm mr-1">add</span> Nueva
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-icons-round text-indigo-500">category</span>
            </div>
            <select 
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="glass-panel bg-white/50 block w-full pl-11 pr-10 py-4 text-base rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-shadow shadow-sm text-gray-900 appearance-none border border-gray-200"
            >
              <option value="" disabled>Selecciona una categoría</option>
              {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <span className="material-icons-round text-gray-400">expand_more</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-600 mb-2 ml-1">Descripción</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-icons-round text-pink-500">description</span>
            </div>
            <input 
              type="text" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="glass-panel bg-white/50 block w-full pl-11 pr-4 py-4 text-base rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-shadow shadow-sm text-gray-900 placeholder-gray-400 border border-gray-200"
              placeholder={type === 'expense' ? "¿En qué gastaste?" : "¿Origen del ingreso?"}
            />
          </div>
        </div>

        {/* Date */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-600 mb-2 ml-1">Fecha</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-icons-round text-indigo-500">calendar_today</span>
            </div>
            <input 
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="glass-panel bg-white/50 block w-full pl-11 pr-4 py-4 text-base rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-shadow shadow-sm text-gray-900 border border-gray-200"
            />
          </div>
        </div>

        <button 
          type="submit"
          className={`w-full text-white font-bold py-4 px-6 rounded-2xl shadow-lg transform transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4 
            ${type === 'expense' 
                ? 'bg-gradient-to-r from-red-500 to-pink-500 shadow-red-500/30' 
                : 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-green-500/30'}`}
        >
          <span className="material-icons-round">check</span>
          Guardar {type === 'expense' ? 'Gasto' : 'Ingreso'}
        </button>
      </form>

      {/* New Category Modal */}
      {showNewCatModal && (
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">
              <div className="bg-white rounded-[2rem] p-6 w-full max-w-sm shadow-2xl animate-blob">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Nueva Categoría</h3>
                  
                  <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Nombre</label>
                        <input 
                            type="text" 
                            value={newCatName}
                            onChange={(e) => setNewCatName(e.target.value)}
                            className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Ej. Gimnasio"
                        />
                      </div>
                      
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Icono</label>
                        <div className="grid grid-cols-6 gap-2 mt-2">
                            {ICONS.map(icon => (
                                <button
                                    key={icon}
                                    type="button"
                                    onClick={() => setNewCatIcon(icon)}
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${newCatIcon === icon ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                                >
                                    <span className="material-icons-round text-lg">{icon}</span>
                                </button>
                            ))}
                        </div>
                      </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                      <button 
                        type="button" 
                        onClick={() => setShowNewCatModal(false)}
                        className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition-colors"
                      >
                          Cancelar
                      </button>
                      <button 
                        type="button"
                        onClick={handleAddCategory}
                        className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30"
                      >
                          Crear
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default AddTransaction;