import './globals.css';
import { Inter } from 'next/font/google';
import { Providers} from './providers'

const inter= Inter({subsets:['latin']});

export const metadata={
  title: 'AI finance tracker',
  description: 'Personal finance with Ai insights',
};

export default function rootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-gray-50`}>
        <Providers>
          <div className='min-h-screen'>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
