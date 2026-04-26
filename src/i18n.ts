// Caminho: src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Aqui ficam os textos do seu projeto. Você pode futuramente separar isso em arquivos .json
const resources = {
    'pt-BR': {
        translation: {
            "dashboard": "Painel de Controle",
            "total_revenue": "Valor da Produção",
            "sales": "Quantidade Produzida",
            // Adicione outras traduções aqui
        }
    },
    'en': {
        translation: {
            "dashboard": "Dashboard",
            "total_revenue": "Total Revenue",
            "sales": "Production Quantity",
        }
    },
    'es': {
        translation: {
            "dashboard": "Panel de Control",
            "total_revenue": "Valor de Producción",
            "sales": "Cantidad Producida",
        }
    }
};

i18n
    .use(initReactI18next) // Passa o i18n para o react-i18next
    .init({
        resources,
        lng: 'pt-BR', // DEFINE O PORTUGUÊS DO BRASIL COMO IDIOMA PRINCIPAL (Forçado)
        fallbackLng: 'pt-BR', // Se alguém escolher Espanhol mas faltar uma palavra, ele mostra em Português

        interpolation: {
            escapeValue: false // O React já é seguro contra XSS
        }
    });

export default i18n;