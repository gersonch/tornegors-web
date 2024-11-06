export const torneoLiga = {
  nombre: 'Formato Liga',
  descripcion:
    'En el formato de torneo tipo Liga, cada equipo compite contra los demás en varias jornadas, acumulando puntos a lo largo de la temporada.',
  formato: {
    estructura: 'round-robin',
    detalles:
      'Cada equipo juega al menos una vez contra cada rival, ya sea como local o visitante, en un número de jornadas determinado.',
    puntos: {
      victoria: 3,
      empate: 1,
      derrota: 0,
    },
    clasificacion:
      'Los equipos se ordenan en la tabla según el total de puntos obtenidos.',
  },
  reglasDesempate: [
    'Diferencia de goles',
    'Goles a favor',
    'Enfrentamientos directos',
  ],
  temporada: {
    duracion: 'Personalizable',
    inicio: 'Fecha inicial determinada por el organizador',
    fin: 'Fecha final determinada por el organizador',
  },
  ganador:
    'El equipo con más puntos al final del torneo es el campeón de la liga.',
  opcionesPersonalizacion: [
    'Cantidad de equipos',
    'Cantidad de jornadas',
    'Puntuación por partido',
  ],
}
