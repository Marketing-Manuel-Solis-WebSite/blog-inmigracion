import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// 1. Configuración de Firebase Admin con limpieza de clave
const getServiceAccount = () => {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT) return null;
  
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    // CORRECCIÓN CRÍTICA: Reemplazar dobles barras invertidas (\\n) por saltos de línea reales (\n)
    if (serviceAccount.private_key) {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }
    return serviceAccount;
  } catch (e) {
    console.error('Error parseando credenciales de Firebase:', e);
    return null;
  }
};

const serviceAccount = getServiceAccount();

// Inicialización segura: solo si tenemos cuenta y no se ha iniciado antes
if (serviceAccount && !getApps().length) {
  try {
    initializeApp({
      credential: cert(serviceAccount)
    });
  } catch (error) {
    console.error('Error inicializando Firebase Admin:', error);
    // No lanzamos error aquí para no romper el build si las credenciales fallan,
    // el error saltará cuando se intente usar la API.
  }
}

// 2. Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const { title, slug, excerpt } = await req.json();
    
    // Autenticación básica
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_SECRET || 'secret123'}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!getApps().length) {
      return NextResponse.json({ error: 'Firebase Admin not configured correctly' }, { status: 500 });
    }

    const db = getFirestore();
    const APP_ID = 'manuel-solis-blog';
    
    // Obtener suscriptores
    const subsSnapshot = await db.collection('artifacts').doc(APP_ID).collection('public').doc('data').collection('subscribers').get();
    
    // Mapeo seguro con tipos 'any' para evitar errores de compilación
    const emails = subsSnapshot.docs
      .map((doc: any) => doc.data().email)
      .filter((e: any) => e);

    if (emails.length === 0) {
      return NextResponse.json({ message: 'No subscribers found' });
    }

    // Enviar correo
    await transporter.sendMail({
      from: `"Portal del Inmigrante" <${process.env.GMAIL_USER}>`,
      bcc: emails,
      subject: `Nuevo Artículo: ${title}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h1 style="color: #C9A227;">${title}</h1>
          <p style="font-size: 16px;">${excerpt}</p>
          <br/>
          <a href="https://elportaldelinmigrante.com/blog/${slug}" 
             style="background-color: #C9A227; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
             Leer Artículo Completo
          </a>
          <br/><br/>
          <p style="font-size: 12px; color: #999;">Si deseas desuscribirte, responde a este correo.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, count: emails.length });
  } catch (error: any) {
    console.error('Email error:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}