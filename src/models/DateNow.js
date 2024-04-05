export const now = new Date();

export const actualHourAndDate = {
  hora: now.getHours(),
  minutos: now.getMinutes(),
  segundos: now.getSeconds(),
  dia: now.getDate(),
  mes: now.getMonth() + 1,
  ano: now.getFullYear(),
};