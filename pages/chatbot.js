import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaRobot, FaUser, FaPaperPlane, FaLightbulb, FaUtensils, FaExclamationTriangle } from 'react-icons/fa';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: '¡Hola! Soy tu asistente virtual para la gestión del restaurante. Puedo ayudarte con predicciones de demanda, sugerencias de platos basados en tu inventario actual, y alertas sobre productos por agotarse. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  
  const [inputMessage, setInputMessage] = useState('');

  // Función para manejar el envío de mensajes
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Agregar mensaje del usuario
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage('');
    
    // Simular respuesta del bot después de un breve retraso
    setTimeout(() => {
      let botResponse = {
        id: messages.length + 2,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      // Respuestas simuladas basadas en palabras clave en el mensaje del usuario
      const userMessageLower = inputMessage.toLowerCase();
      
      if (userMessageLower.includes('predicción') || userMessageLower.includes('demanda') || userMessageLower.includes('mañana')) {
        botResponse.text = 'Basado en el historial de ventas y la tendencia actual, te recomiendo preparar para mañana:\n\n- 35 platos de Lomo Saltado\n- 28 platos de Ceviche\n- 20 platos de Ají de Gallina\n- 15 platos de Arroz con Mariscos\n\nEsto optimizará tus recursos y minimizará el desperdicio de alimentos.';
        botResponse.type = 'prediction';
      } else if (userMessageLower.includes('plato') || userMessageLower.includes('sugerencia') || userMessageLower.includes('recomendar')) {
        botResponse.text = 'Con los ingredientes disponibles en tu inventario, te sugiero preparar estos platos especiales:\n\n1. Risotto de champiñones y espárragos (aprovecha los champiñones que están por vencer)\n2. Tacos de pescado con salsa de mango (el pescado fresco recién llegado)\n3. Ensalada mediterránea (utilizando las verduras de temporada)\n\nEstos platos tienen un margen de ganancia promedio del 65% y utilizan ingredientes que necesitan rotación.';
        botResponse.type = 'suggestion';
      } else if (userMessageLower.includes('stock') || userMessageLower.includes('inventario') || userMessageLower.includes('almacén') || userMessageLower.includes('producto')) {
        botResponse.text = '⚠️ Alerta de inventario: Tienes productos que requieren atención inmediata:\n\n- Arroz: 5kg (15% del stock mínimo)\n- Aceite de oliva: 2 botellas (20% del stock mínimo)\n- Limones: 1kg (10% del stock mínimo)\n- Papas: 8kg (25% del stock mínimo)\n\nRecomiendo reabastecer estos productos en las próximas 48 horas para evitar problemas en la operación.';
        botResponse.type = 'alert';
      } else if (userMessageLower.includes('desperdicio') || userMessageLower.includes('optimizar')) {
        botResponse.text = 'Análisis de desperdicio de alimentos:\n\nEsta semana has reducido el desperdicio en un 12% comparado con la semana anterior. Las principales mejoras fueron:\n\n- Mejor utilización de verduras (-18% desperdicio)\n- Porciones optimizadas de proteínas (-15% desperdicio)\n\nSugerencia: Considera implementar un menú especial de fin de semana para utilizar los ingredientes remanentes.';
        botResponse.type = 'waste';
      } else {
        botResponse.text = 'Puedo ayudarte con predicciones de demanda, sugerencias de platos basados en tu inventario, alertas sobre productos por agotarse, y análisis de desperdicio. ¿Sobre qué tema necesitas información específica?';
        botResponse.type = 'general';
      }
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
  };

  // Función para renderizar los mensajes con estilos diferentes según el remitente
  const renderMessage = (message) => {
    const isBot = message.sender === 'bot';
    
    return (
      <div 
        key={message.id} 
        className={`mb-4 ${isBot ? 'mr-12' : 'ml-12'}`}
      >
        <div className="flex items-start">
          {isBot && (
            <div className="flex-shrink-0 mr-3">
              <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
                <FaRobot size={20} />
              </div>
            </div>
          )}
          
          <div 
            className={`rounded-lg p-4 max-w-full ${isBot 
              ? 'bg-white border border-gray-200 text-gray-800' 
              : 'bg-primary-500 text-white ml-auto'}`}
          >
            {message.type === 'prediction' && (
              <div className="flex items-center mb-2">
                <FaLightbulb className="text-yellow-500 mr-2" />
                <span className="font-medium">Predicción de Demanda</span>
              </div>
            )}
            {message.type === 'suggestion' && (
              <div className="flex items-center mb-2">
                <FaUtensils className="text-green-500 mr-2" />
                <span className="font-medium">Sugerencia de Platos</span>
              </div>
            )}
            {message.type === 'alert' && (
              <div className="flex items-center mb-2">
                <FaExclamationTriangle className="text-red-500 mr-2" />
                <span className="font-medium">Alerta de Inventario</span>
              </div>
            )}
            <div className="whitespace-pre-line">{message.text}</div>
            <div className="text-xs mt-2 opacity-70">{message.timestamp}</div>
          </div>
          
          {!isBot && (
            <div className="flex-shrink-0 ml-3">
              <div className="h-10 w-10 rounded-full bg-secondary-500 flex items-center justify-center text-white">
                <FaUser size={20} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Layout title="Chatbot Predictivo">
      <div className="flex h-full">
        {/* Panel principal del chat */}
        <div className="flex-1 flex flex-col">
          <div className="dashboard-card flex-1 flex flex-col h-full">
            <div className="mb-4 pb-4 border-b">
              <h2 className="text-xl font-bold text-gray-800">Asistente Virtual</h2>
              <p className="text-gray-500">Consulta predicciones, sugerencias y alertas para optimizar tu restaurante</p>
            </div>
            
            {/* Área de mensajes */}
            <div className="flex-1 overflow-y-auto mb-4 pr-2 scroll-smooth" style={{ maxHeight: 'calc(100vh - 300px)' }}>
              {messages.map((message, index) => (
                <div key={message.id} className={`animate-fade-in ${index === messages.length - 1 ? 'animate-slide-up' : ''}`}>
                  {renderMessage(message)}
                </div>
              ))}
            </div>
            
            {/* Formulario de entrada */}
            <form onSubmit={handleSendMessage} className="mt-auto">
              <div className="relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Escribe tu mensaje aquí..."
                  className="input pr-12"
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-500 hover:text-primary-700 p-2"
                  disabled={!inputMessage.trim()}
                >
                  <FaPaperPlane size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Panel lateral con sugerencias */}
        <div className="w-80 ml-6 hidden lg:block">
          <div className="dashboard-card mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Sugerencias Rápidas</h3>
            <div className="space-y-2">
              <button 
                onClick={() => setInputMessage('¿Cuál es la predicción de demanda para mañana?')}
                className="w-full text-left p-2 rounded-md hover:bg-gray-100 transition-colors text-sm transform hover:scale-105 active:scale-95 transition-transform duration-200"
              >
                <span className="inline-flex items-center">
                  <FaLightbulb className="mr-2 text-yellow-500" />
                  ¿Cuál es la predicción de demanda para mañana?
                </span>
              </button>
              <button 
                onClick={() => setInputMessage('Sugiere platos con los ingredientes disponibles')}
                className="w-full text-left p-2 rounded-md hover:bg-gray-100 transition-colors text-sm transform hover:scale-105 active:scale-95 transition-transform duration-200"
              >
                <span className="inline-flex items-center">
                  <FaUtensils className="mr-2 text-green-500" />
                  Sugiere platos con los ingredientes disponibles
                </span>
              </button>
              <button 
                onClick={() => setInputMessage('¿Qué productos están en stock crítico?')}
                className="w-full text-left p-2 rounded-md hover:bg-gray-100 transition-colors text-sm transform hover:scale-105 active:scale-95 transition-transform duration-200"
              >
                <span className="inline-flex items-center">
                  <FaExclamationTriangle className="mr-2 text-red-500" />
                  ¿Qué productos están en stock crítico?
                </span>
              </button>
              <button 
                onClick={() => setInputMessage('¿Cómo puedo optimizar el desperdicio de alimentos?')}
                className="w-full text-left p-2 rounded-md hover:bg-gray-100 transition-colors text-sm transform hover:scale-105 active:scale-95 transition-transform duration-200"
              >
                <span className="inline-flex items-center">
                  ¿Cómo puedo optimizar el desperdicio de alimentos?
                </span>
              </button>
            </div>
          </div>
          
          <div className="dashboard-card">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Estadísticas de Uso</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Consultas realizadas hoy</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Predicciones acertadas</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Ahorro estimado</span>
                  <span className="font-medium">S/. 450</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-secondary-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chatbot;