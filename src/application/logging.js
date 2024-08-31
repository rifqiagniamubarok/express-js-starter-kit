import winston from 'winston';

const levelColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
};

const colorizeFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.printf(({ level, message, ...rest }) => {
    const json = JSON.stringify({ message, ...rest });
    return `${level}: ${json}`;
  })
);

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: colorizeFormat,
    }),
  ],
});

winston.addColors(levelColors);
