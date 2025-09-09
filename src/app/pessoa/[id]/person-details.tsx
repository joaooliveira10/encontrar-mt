'use client';
import { StatusBadge } from '@/components/StatusBadge';
import { usePersonDetails } from '@/features/persons/hooks/usePersonDetails';
import { useSubmitReport } from '@/features/reports/hooks/useSubmitReport';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const schema = z.object({
  informacao: z.string().min(5, 'Mínimo 5 caracteres').max(1000, 'Máximo 1000 caracteres'),
  descricao: z.string().max(200, 'Máximo 200 caracteres').optional(),
  data: z.string().optional(),
  fotos: z.any().optional(),
});

type FormValues = z.infer<typeof schema>;

// Cache de imagens falhadas
const failedImages = new Set<string>();

export default function PersonDetails() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const { data, isLoading, isError } = usePersonDetails(id);
  const [showReportForm, setShowReportForm] = useState(false);
  const submitMutation = useSubmitReport(data?.ocoId);
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormValues>({ 
    resolver: zodResolver(schema) 
  });

  const watchedInformacao = watch('informacao', '');
  const isDesaparecido = data?.status === 'DESAPARECIDO';

  function onSubmit(values: FormValues) {
    const files = values.fotos as FileList | undefined;
    const arquivos: File[] = files?.length ? Array.from(files) : [];
    
    submitMutation.mutate({ ...values, arquivos }, {
      onSuccess: () => { 
        reset(); 
        setShowReportForm(false); 
        toast.success('Informação enviada com sucesso! Obrigado por ajudar.', {
          duration: 5000,
          icon: '✅',
        });
      },
      onError: (error) => {
        console.error('Erro ao enviar:', error);
        toast.error('Falha ao enviar informação. Tente novamente.', {
          duration: 4000,
          icon: '❌',
        });
      },
    });
  }

  useEffect(() => {
    if (isError) {
      toast.error('Falha ao carregar informações da pessoa', {
        duration: 4000,
        icon: '⚠️',
      });
    }
  }, [isError]);

  if (isLoading) return (
    <div className="space-y-8 animate-fade-in">
      {/* Header skeleton */}
      <div className="bg-white rounded-xl shadow-soft p-8 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8">
          <div className="w-48 h-64 bg-gray-200 rounded-lg shrink-0 animate-pulse" />
          <div className="flex-1 space-y-4">
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-32 bg-gray-200 rounded-full animate-pulse" />
            <div className="space-y-3">
              <div className="h-5 w-48 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-36 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="h-12 w-36 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );

  if (isError || !data) return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
      <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 className="text-xl font-semibold text-red-900 mb-2">Erro ao carregar informações</h2>
      <p className="text-red-700 mb-6">Não foi possível carregar os dados desta pessoa.</p>
      <Link 
        href="/"
        className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Voltar ao início
      </Link>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header principal */}
      <div className="bg-white rounded-xl shadow-medium border border-gray-100 overflow-hidden">
        {/* Status bar */}
        <div className={`h-2 ${isDesaparecido ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-green-500 to-green-600'}`} />
        
        <div className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-start gap-8">
            {/* Foto */}
            <div className="relative w-48 h-64 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shrink-0 shadow-medium mx-auto lg:mx-0">
              {data.fotoUrl && !failedImages.has(data.fotoUrl) ? (
                <Image
                  src={data.fotoUrl}
                  alt={`Foto de ${data.nome}`}
                  fill
                  sizes="192px"
                  className="object-cover"
                  unoptimized
                  onError={(e: any) => {
                    if (data.fotoUrl) failedImages.add(data.fotoUrl);
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent && !parent.querySelector('[data-fallback]')) {
                      const fallback = document.createElement('div');
                      fallback.dataset.fallback = 'true';
                      fallback.className = 'absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700';
                      fallback.innerHTML = `
                        <div class="text-4xl font-bold mb-2">${data.nome.split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase()}</div>
                        <div class="text-sm">Foto não disponível</div>
                      `;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700">
                  <div className="text-4xl font-bold mb-2">
                    {data.nome.split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase()}
                  </div>
                  <div className="text-sm">Foto não disponível</div>
                </div>
              )}
            </div>

            {/* Informações principais */}
            <div className="flex-1 space-y-6">
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <h1 className="text-3xl font-bold text-gray-900">{data.nome}</h1>
                  <StatusBadge status={data.status} size="lg" />
                </div>
                
                {isDesaparecido && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 font-medium flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <span>Esta pessoa está desaparecida. Qualquer informação pode ajudar!</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Detalhes */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {data.idade && (
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Idade</p>
                        <p className="font-semibold text-gray-900">{data.idade} anos</p>
                      </div>
                    </div>
                  )}

                  {data.sexo && (
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Sexo</p>
                        <p className="font-semibold text-gray-900 capitalize">{data.sexo.toLowerCase()}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {(data.cidade || data.estado) && (
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Localização</p>
                        <p className="font-semibold text-gray-900">
                          {data.cidade}{data.estado ? ` - ${data.estado}` : ''}
                        </p>
                      </div>
                    </div>
                  )}

                  {data.dataDesaparecimento && (
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Data do desaparecimento</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(data.dataDesaparecimento).toLocaleDateString('pt-BR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Botão de ação */}
            <div className="lg:self-start">
              <button
                onClick={() => setShowReportForm(prev => !prev)}
                className={`w-full lg:w-auto px-6 py-3 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 ${
                  showReportForm
                    ? 'bg-gray-500 hover:bg-gray-600 text-white'
                    : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showReportForm ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  )}
                </svg>
                <span>{showReportForm ? 'Cancelar' : 'Enviar Informação'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Formulário de informações */}
      {showReportForm && (
        <div className="bg-white rounded-xl shadow-medium border border-gray-100 p-8 animate-slide-in">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center space-x-2">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Nova Informação</span>
            </h2>
            <p className="text-gray-600">
              Compartilhe qualquer informação que possa ajudar a localizar {data.nome}. 
              Todas as informações são enviadas diretamente às autoridades competentes.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Campo principal de informação */}
            <div className="space-y-2">
              <label htmlFor="informacao" className="block text-sm font-semibold text-gray-700">
                Informação *
              </label>
              <div className="relative">
                <textarea 
                  id="informacao" 
                  className={`w-full border-2 rounded-xl p-4 text-sm resize-none transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-100 ${
                    errors.informacao 
                      ? 'border-red-300 focus:border-red-400' 
                      : 'border-gray-200 focus:border-red-300 hover:border-gray-300'
                  }`}
                  rows={4} 
                  placeholder="Descreva qualquer informação relevante sobre o paradeiro, avistamentos, ou outros detalhes importantes..."
                  {...register('informacao')} 
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {watchedInformacao?.length || 0}/1000
                </div>
              </div>
              {errors.informacao && (
                <p className="text-sm text-red-600 flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{errors.informacao.message}</span>
                </p>
              )}
            </div>

            {/* Campos adicionais */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Upload de fotos */}
              <div className="space-y-2">
                <label htmlFor="fotos" className="block text-sm font-semibold text-gray-700">
                  Fotos (opcional)
                </label>
                <div className="relative">
                  <input
                    id="fotos"
                    type="file"
                    accept="image/*"
                    multiple
                    className="w-full text-sm border-2 border-gray-200 rounded-xl p-3 focus:border-red-300 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                    {...register('fotos', {
                      validate: (files: FileList) => {
                        if (!files || files.length === 0) return true;
                        if (files.length > 5) return 'Máximo 5 arquivos';
                        for (const f of Array.from(files)) {
                          if (f.size > 2 * 1024 * 1024) return 'Cada arquivo deve ter até 2MB';
                          if (!/^image\//.test(f.type)) return 'Apenas imagens são permitidas';
                        }
                        return true;
                      },
                    })}
                  />
                </div>
                {errors.fotos && (
                  <p className="text-xs text-red-600">{String(errors.fotos.message)}</p>
                )}
                <p className="text-xs text-gray-500">Até 5 fotos, máximo 2MB cada</p>
              </div>

              {/* Descrição dos anexos */}
              <div className="space-y-2">
                <label htmlFor="descricao" className="block text-sm font-semibold text-gray-700">
                  Descrição das fotos
                </label>
                <input 
                  id="descricao" 
                  type="text" 
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-red-300 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200" 
                  placeholder="Ex: Pessoa vista no shopping..."
                  {...register('descricao')} 
                />
                {errors.descricao && (
                  <p className="text-xs text-red-600">{errors.descricao.message}</p>
                )}
              </div>

              {/* Data */}
              <div className="space-y-2">
                <label htmlFor="data" className="block text-sm font-semibold text-gray-700">
                  Data do avistamento
                </label>
                <input 
                  id="data" 
                  type="date" 
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-red-300 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200" 
                  {...register('data')} 
                />
              </div>
            </div>

            {/* Disclaimer e ações */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex space-x-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">Informações importantes:</p>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• Suas informações serão enviadas diretamente às autoridades competentes</li>
                    <li>• Mantenha sigilo sobre investigações em andamento</li>
                    <li>• Em situações de emergência, ligue 190</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                type="button" 
                onClick={() => setShowReportForm(false)} 
                className="flex-1 sm:flex-none px-6 py-3 text-sm font-medium border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                disabled={submitMutation.isPending} 
                className="flex-1 px-6 py-3 text-sm font-bold bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
              >
                {submitMutation.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Enviar Informação</span>
                  </>
                )}
              </button>
            </div>

            {/* Feedback do envio */}
            <div className="min-h-[1.5rem]" aria-live="polite">
              {submitMutation.isError && (
                <div className="flex items-center space-x-2 text-red-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm">Erro ao enviar informação. Tente novamente.</p>
                </div>
              )}
              {submitMutation.isSuccess && (
                <div className="flex items-center space-x-2 text-green-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm">Informação enviada com sucesso!</p>
                </div>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
