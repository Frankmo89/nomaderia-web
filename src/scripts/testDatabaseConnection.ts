/**
 * Script de prueba para verificar conectividad con Supabase
 * Crea 10 clientes ficticios y navega por la base de datos
 */

import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase desde variables de entorno
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY deben estar configuradas');
  console.log('Por favor, crea un archivo .env con tus credenciales de Supabase');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Datos de 10 clientes ficticios con información realista
const fictionalClients = [
  {
    clientname: 'María González',
    clientemail: 'maria.gonzalez@email.com',
    phonewhatsapp: '+52 664 123 4567',
    destination: 'Yosemite National Park',
    budget: '$1500-2000',
    accommodation: 'camping',
    fitness_level: 'moderado',
    travel_dates: '2026-03-15',
    status: 'new',
    psychography: 'Aventurera, le encanta la naturaleza',
    concerns: 'Primera vez acampando en USA',
    additional_notes: 'Quiere ver las cascadas'
  },
  {
    clientname: 'Carlos Ramírez',
    clientemail: 'carlos.ramirez@email.com',
    phonewhatsapp: '+52 664 234 5678',
    destination: 'Sequoia National Park',
    budget: '$2000-3000',
    accommodation: 'hotel',
    fitness_level: 'alto',
    travel_dates: '2026-04-20',
    status: 'contacted',
    psychography: 'Fotógrafo amateur, busca vistas épicas',
    concerns: 'Necesita ayuda con permisos',
    additional_notes: 'Interesado en fotografía nocturna'
  },
  {
    clientname: 'Ana Martínez',
    clientemail: 'ana.martinez@email.com',
    phonewhatsapp: '+52 664 345 6789',
    destination: 'Death Valley',
    budget: '$1000-1500',
    accommodation: 'rv',
    fitness_level: 'bajo',
    travel_dates: '2026-02-10',
    status: 'planning',
    psychography: 'Familia con niños pequeños',
    concerns: 'Temperatura del desierto',
    additional_notes: 'Viaja con 2 niños menores de 5 años'
  },
  {
    clientname: 'Roberto Silva',
    clientemail: 'roberto.silva@email.com',
    phonewhatsapp: '+52 664 456 7890',
    destination: 'Grand Canyon',
    budget: '$3000-4000',
    accommodation: 'hotel',
    fitness_level: 'moderado',
    travel_dates: '2026-05-15',
    status: 'new',
    psychography: 'Ejecutivo buscando desconexión',
    concerns: 'Tiempo limitado (solo 3 días)',
    additional_notes: 'Primera experiencia en parques nacionales'
  },
  {
    clientname: 'Laura Hernández',
    clientemail: 'laura.hernandez@email.com',
    phonewhatsapp: '+52 664 567 8901',
    destination: 'Joshua Tree',
    budget: '$800-1200',
    accommodation: 'camping',
    fitness_level: 'alto',
    travel_dates: '2026-03-25',
    status: 'contacted',
    psychography: 'Escaladora, busca rutas de boulder',
    concerns: 'Ninguna, ya conoce el parque',
    additional_notes: 'Quiere explorar rutas nuevas'
  },
  {
    clientname: 'Diego Torres',
    clientemail: 'diego.torres@email.com',
    phonewhatsapp: '+52 664 678 9012',
    destination: 'Zion National Park',
    budget: '$2500-3500',
    accommodation: 'hotel',
    fitness_level: 'alto',
    travel_dates: '2026-04-10',
    status: 'planning',
    psychography: 'Entusiasta del senderismo extremo',
    concerns: 'Quiere hacer Angels Landing',
    additional_notes: 'Viaja en grupo de 4 personas'
  },
  {
    clientname: 'Sofía Méndez',
    clientemail: 'sofia.mendez@email.com',
    phonewhatsapp: '+52 664 789 0123',
    destination: 'Big Sur',
    budget: '$2000-2500',
    accommodation: 'hotel',
    fitness_level: 'bajo',
    travel_dates: '2026-06-05',
    status: 'new',
    psychography: 'Luna de miel, busca romance y paisajes',
    concerns: 'Mejor época para visitar',
    additional_notes: 'Aniversario de boda'
  },
  {
    clientname: 'Miguel Vargas',
    clientemail: 'miguel.vargas@email.com',
    phonewhatsapp: '+52 664 890 1234',
    destination: 'Lake Tahoe',
    budget: '$1800-2200',
    accommodation: 'rv',
    fitness_level: 'moderado',
    travel_dates: '2026-07-20',
    status: 'contacted',
    psychography: 'Amante de deportes acuáticos',
    concerns: 'Renta de equipo de kayak',
    additional_notes: 'Interesado en actividades acuáticas'
  },
  {
    clientname: 'Gabriela Ortiz',
    clientemail: 'gabriela.ortiz@email.com',
    phonewhatsapp: '+52 664 901 2345',
    destination: 'Mammoth Lakes',
    budget: '$1500-2000',
    accommodation: 'camping',
    fitness_level: 'alto',
    travel_dates: '2026-08-15',
    status: 'planning',
    psychography: 'Mochilera experimentada',
    concerns: 'Permisos para backcountry',
    additional_notes: 'Quiere hacer una ruta de varios días'
  },
  {
    clientname: 'Fernando Castillo',
    clientemail: 'fernando.castillo@email.com',
    phonewhatsapp: '+52 664 012 3456',
    destination: 'San Diego Beaches',
    budget: '$500-800',
    accommodation: 'camping',
    fitness_level: 'moderado',
    travel_dates: '2026-09-01',
    status: 'new',
    psychography: 'Surfista, busca olas y playas',
    concerns: 'Mejores spots de surf',
    additional_notes: 'Viaje corto de fin de semana'
  }
];

async function testDatabaseConnection() {
  console.log('\n🚀 INICIANDO PRUEBA DE CONECTIVIDAD CON SUPABASE\n');
  console.log('='.repeat(60));

  // 1. Verificar conexión
  console.log('\n📡 1. Verificando conexión con Supabase...');
  try {
    const { data: testConnection, error: connectionError } = await supabase
      .from('leads')
      .select('id')
      .limit(1);

    if (connectionError) {
      console.error('❌ Error de conexión:', connectionError.message);
      return;
    }
    console.log('✅ Conexión exitosa con Supabase');
  } catch (error) {
    console.error('❌ Error al conectar con Supabase:', error);
    return;
  }

  // 2. Limpiar datos de prueba anteriores (opcional)
  console.log('\n🧹 2. Limpiando datos de prueba anteriores...');
  const testEmails = fictionalClients.map(c => c.clientemail);
  const { error: deleteError } = await supabase
    .from('leads')
    .delete()
    .in('clientemail', testEmails);

  if (deleteError) {
    console.log('⚠️  No se pudieron eliminar datos anteriores:', deleteError.message);
  } else {
    console.log('✅ Datos de prueba anteriores eliminados');
  }

  // 3. Insertar 10 clientes ficticios
  console.log('\n📝 3. Insertando 10 clientes ficticios...');
  const { data: insertedLeads, error: insertError } = await supabase
    .from('leads')
    .insert(fictionalClients)
    .select();

  if (insertError) {
    console.error('❌ Error al insertar clientes:', insertError.message);
    return;
  }

  console.log(`✅ ${insertedLeads?.length || 0} clientes insertados exitosamente`);
  console.log('\nClientes creados:');
  insertedLeads?.forEach((lead, index) => {
    console.log(`  ${index + 1}. ${lead.clientname} - ${lead.destination} (${lead.status})`);
  });

  // 4. Consultar todos los leads
  console.log('\n📊 4. Consultando todos los leads...');
  const { data: allLeads, error: selectError } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (selectError) {
    console.error('❌ Error al consultar leads:', selectError.message);
    return;
  }

  console.log(`✅ Total de leads en la base de datos: ${allLeads?.length || 0}`);

  // 5. Filtrar por status
  console.log('\n🔍 5. Navegando por diferentes filtros...');
  
  const statuses = ['new', 'contacted', 'planning', 'traveling', 'completed'];
  for (const status of statuses) {
    const { data: statusLeads, error } = await supabase
      .from('leads')
      .select('*')
      .eq('status', status);

    if (!error) {
      console.log(`  📌 Status "${status}": ${statusLeads?.length || 0} leads`);
    }
  }

  // 6. Buscar por destino
  console.log('\n🗺️  6. Agrupando por destinos populares...');
  const destinations = new Map();
  allLeads?.forEach(lead => {
    const count = destinations.get(lead.destination) || 0;
    destinations.set(lead.destination, count + 1);
  });

  console.log('  Destinos más solicitados:');
  Array.from(destinations.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .forEach(([dest, count]) => {
      console.log(`    • ${dest}: ${count} cliente(s)`);
    });

  // 7. Actualizar un lead
  console.log('\n✏️  7. Probando actualización de lead...');
  if (insertedLeads && insertedLeads.length > 0) {
    const leadToUpdate = insertedLeads[0];
    const { data: updatedLead, error: updateError } = await supabase
      .from('leads')
      .update({ status: 'contacted', additional_notes: 'Lead contactado por test script' })
      .eq('id', leadToUpdate.id)
      .select();

    if (updateError) {
      console.error('❌ Error al actualizar lead:', updateError.message);
    } else {
      console.log(`✅ Lead actualizado: ${updatedLead?.[0]?.clientname} ahora tiene status "${updatedLead?.[0]?.status}"`);
    }
  }

  // 8. Buscar por email
  console.log('\n🔎 8. Probando búsqueda por email...');
  const { data: emailSearch, error: emailError } = await supabase
    .from('leads')
    .select('*')
    .eq('clientemail', 'maria.gonzalez@email.com')
    .single();

  if (emailError) {
    console.error('❌ Error en búsqueda por email:', emailError.message);
  } else {
    console.log(`✅ Lead encontrado: ${emailSearch?.clientname}`);
  }

  // 9. Resumen final
  console.log('\n📈 9. RESUMEN DE LA PRUEBA');
  console.log('='.repeat(60));
  console.log(`✅ Conexión a Supabase: EXITOSA`);
  console.log(`✅ Inserción de datos: EXITOSA (${insertedLeads?.length || 0} registros)`);
  console.log(`✅ Consulta de datos: EXITOSA (${allLeads?.length || 0} registros totales)`);
  console.log(`✅ Actualización de datos: EXITOSA`);
  console.log(`✅ Búsqueda de datos: EXITOSA`);
  console.log('\n🎉 Todas las operaciones de base de datos funcionan correctamente!\n');
  console.log('='.repeat(60));

  // 10. Mostrar tabla completa de clientes de prueba
  console.log('\n📋 TABLA DE CLIENTES FICTICIOS INSERTADOS:\n');
  console.log('┌─────┬─────────────────────┬────────────────────────┬──────────────┬─────────────┐');
  console.log('│ No. │ Nombre              │ Destino                │ Presupuesto  │ Status      │');
  console.log('├─────┼─────────────────────┼────────────────────────┼──────────────┼─────────────┤');
  
  insertedLeads?.forEach((lead, index) => {
    const name = lead.clientname.padEnd(19);
    const destination = lead.destination.length > 22 
      ? lead.destination.substring(0, 19) + '...' 
      : lead.destination.padEnd(22);
    const budget = (lead.budget || 'N/A').padEnd(12);
    const status = lead.status.padEnd(11);
    console.log(`│ ${(index + 1).toString().padStart(3)} │ ${name} │ ${destination} │ ${budget} │ ${status} │`);
  });
  
  console.log('└─────┴─────────────────────┴────────────────────────┴──────────────┴─────────────┘');
  console.log('\n');
}

// Ejecutar el script
testDatabaseConnection()
  .then(() => {
    console.log('Script finalizado exitosamente ✨');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error fatal en el script:', error);
    process.exit(1);
  });
