declare interface Window {
   PaystackPop: {
      setup: (options: {
         key: string;
         email: string;
         amount: number;
         currency?: string;
         ref?: string;
         metadata?: {
            custom_fields: Array<{
               display_name: string;
               variable_name: string;
               value: string;
            }>;
         };
         callback: (response: { reference: string }) => void;
         onClose: () => void;
      }) => {
         openIframe: () => void;
      };
   };
}
