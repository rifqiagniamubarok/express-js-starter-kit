import chalk from 'chalk';
import dayjs from 'dayjs';
import morgan from 'morgan';

const customFormat = (tokens, req, res) => {
  const methodColor = chalk.green;
  const urlColor = chalk.cyan;
  const statusColor = chalk.red;
  const responseTimeColor = chalk.magenta;

  return [
    `Time: ${chalk.blue(dayjs(tokens.date(req, res, 'iso')).format('HH:mm:ss DD/MM/YY'))}`,
    `Method: ${methodColor(tokens.method(req, res))}`,
    `URL: ${urlColor(tokens.url(req, res))}`,
    `Status: ${statusColor(tokens.status(req, res))}`,
    `Response Time: ${responseTimeColor(tokens['response-time'](req, res))} ms`,
    `Content Length: ${chalk.yellow(tokens.res(req, res, 'content-length') || 'unknown')}`,
  ].join(' | ');
};

export default morgan(customFormat);
