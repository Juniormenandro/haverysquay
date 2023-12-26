
"use client";
import { useState, useEffect, useMemo } from 'react';
import Header from '../header';
import Spinner from "@/components/Spinner/Spinner";
import { fetcher } from '@/utils/fetcher/fetcher';
import 'react-datepicker/dist/react-datepicker.css';
import useSWR, { mutate } from 'swr';
import { useRouter } from "next/navigation";
import React from 'react';


interface Servico {
  selectedColor: string;
  selectedModel: string;
  selectedPayment: string;
  rawPrice:Number;
  selectedProductNane: string; 
  id: string;
  carro: string;  
  concluido: boolean;
  aguardandoPagamento: boolean;
  data:any;
};

interface Booking {
  id: string;
  selectedDayOfWeek: React.ReactNode;
  selectedDate: number | string;
  selectedMonth: React.ReactNode;
  selectedYear: React.ReactNode;
  selectedTime: React.ReactNode;
  selectedProductDefaultPrice: React.ReactNode;

};

interface Cliente {
  email: string;
  endereco: string;
  id: string;
  nome: string;
  telefone: string;
  servicos: Servico[];
  Booking: Booking[];
};
  
export default function Page() {
  
  const [token, setToken] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<Record<string, boolean>>({});
  const [newPrice, setNewPrice] = useState<string>('');
  const [periodoFiltragem, setPeriodoFiltragem] = useState('all');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showReturned, setShowReturned] = useState(false);
  const router = useRouter();
  const [selectedField, setSelectedField] = useState('rawPrice');

  
  useEffect(() => {
    if (typeof window !== 'undefined') {
        const userToken = localStorage.getItem('token');
        if (!userToken) {
            alert('O usuário não está logado!');
            router.push("/login");
            return;
        }
        setToken(userToken);
    }
  }, [router]);


  const fetchURL = useMemo(() => {
    if (!token) return null;

    const currentDate = selectedDate.toISOString();

    let param = "";
      switch (periodoFiltragem) {
        case 'day':
          param = `date=${currentDate}`;
          break;
        case 'week':
          param = `weekDate=${currentDate}`;
          break;
        case 'month':
          param = `monthDate=${currentDate}`;
          break;
          case 'all':
          param = '/';
          break;
        default:
          return null;
      }
      if (showReturned) {
        param += '&returned=true';
      }

    return `${process.env.NEXT_PUBLIC_API_URL}/api/customers?${param}`;
  }, [token, periodoFiltragem, selectedDate, showReturned]);  // Add 'showReturned' as a dependency



  //const fetchURL = token ? `${process.env.NEXT_PUBLIC_API_URL}/api/customers` : null;
  // Lógica do SWR
  const { data: clientes, error: isError, isLoading } = useSWR<Cliente[]>(fetchURL ? [fetchURL, token] : null, fetcher, {
    revalidateOnFocus: false,
  });


  if (!fetchURL) {
    return null;  // Isso pode ser substituído por um fallback ou conteúdo padrão.
  }



  async function updateServicePrice(id: string, field: string, value: any) {
    if (!value) return;
    try {
      const response = await fetch(`/api/customers/updatePrice?id=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [field]: value }), // Atualizando o campo específico
      });
  
      if (!response.ok) {
        throw new Error("Failed to update the record.");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  const handleUpdate = async (serviceId: string) => {
    setLoadingState(prev => ({ ...prev, [serviceId]: true }));
  
    try {
      await updateServicePrice(serviceId, selectedField, newPrice); // Passando o campo selecionado e o novo valor
  
      // A parte do código que atualiza o valor localmente precisa ser ajustada para atualizar o campo correto
      if (clientes) {
        const updatedClientes = clientes.map(client => ({
          ...client,
          servicos: client.servicos.map(servico =>
            servico.id === serviceId
            ? { ...servico, [selectedField]: newPrice }
            : servico
          )
        }));
  
        mutate(updatedClientes);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState(prev => ({ ...prev, [serviceId]: false }));
      window.location.reload();
    }
  };
  


  if (isError) {
    console.error("Erro ao buscar clientes:", isError);
    
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center mt-10">
        <Spinner />
      </div>
    );
  }

  return (
    <>
    <Header />
    <div className="flex flex-col items-center min-h-screen  ">
    <div className="w-full max-w-lg">

      <div className='m-2 text-2xl text-center bg-white p-2 font-semibold rounded-2xl'>
        <h1>CUSTOMERS</h1>
      </div>
      <div className="flex justify-center text-center">
        <div className="mt-10 ml-2 ">
        <button className=' p-2 text-white bg-blue-500 font-semibold rounded-lg'
          onClick={() => setShowReturned(!showReturned)} type={'button'} >
          {showReturned ? 'back. ' : 'returning customers'}
        </button>
        </div>
      </div>
      <ul>
        {clientes?.map(client => (
          <li key={client.id} >
            <div className="flex justify-center text-center bg-white mt-5 ml-3 mr-3 rounded-t-2xl"  >
              <div className=' flex-1 justify-center'>
                <h1 className="text-[22px] font-semibold">
                  {client.nome}
                </h1>
              </div>
              <div className=' flex-1 justify-center'>
                <h1 className="text-[23px] font-semibold ">
                  {client.telefone}
                </h1>
              </div>
            </div>
            
            {client.servicos && client.servicos.map(servico => (
              <React.Fragment key={servico.id}>


                <div key={servico.id} className="flex  text-center bg-white ml-3 mr-3 p-2 ">
                  <div className='flex-1 flex justify-center w-1/2'>
                    <div className=' w-full'>
                      <h2 className=' text-[17px] pb-[1px] border'>{servico.selectedProductNane}</h2>
                      <h2 className=' text-[18px] border'>{servico.selectedPayment}</h2>
                    </div>
                  </div>
                  <div className='flex-1 flex justify-center w-1/2'>
                    <div className=' w-full'>
                      <h2 className=' text-[18px] border'>€ {servico.rawPrice ? Math.floor(Number(servico.rawPrice) / 100) : "0"}</h2>
                      <h2 className=' text-[18px] border'>
                        {servico.data && typeof servico.data === 'string' 
                          ? new Date(servico.data).toLocaleDateString('pt-BR') 
                          : 'Data não definida'}
                      </h2>
                    </div>
                  </div>
                </div>

                <div key={servico.id} className=" text-center bg-white ml-3 mr-3 p-2 ">
                    <h2 className=' text-[18px] border '>{client.email}</h2>
                    <h2 className=' text-[18px] border '>{client.endereco}</h2>
                </div>
                
                <div className='bg-white text-blue-500 text-center font-semibold ml-3 mr-3 rounded-b-2xl' >
                  <select 
                    value={selectedField}
                    onChange={(e) => setSelectedField(e.target.value)}
                    className="text-blue-500 p-1 rounded-2xl border border-blue-500"
                  >
                    <option value="rawPrice">Price</option>
                    <option value="selectedPayment">Payment</option>
                  
                    
                  </select>
                  <input 
                    className=" pl-3 w-28 text-blue-500 p-1 ml-2 mr-2 rounded-2xl border border-blue-500" 
                    type="text" 
                    value={newPrice} 
                    onChange={(e) => setNewPrice(e.target.value)} 
                    placeholder="text..." 
                  />
                  <button 
                    className=' p-1 w-20 bg-blue-500 text-white rounded-2xl m-1'
                    disabled={!!loadingState[servico.id]} 
                    onClick={() => handleUpdate(servico.id) }>
                      {loadingState[servico.id] ? 'loading...' : 'SEND'}
                  </button>
                </div>
              </React.Fragment>
            ))}         
          </li>
        ))}
      </ul>
    </div>
  </div>
  </>
  );
}




