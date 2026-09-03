export function formatTimelineDate(isoDate) {
  const date = new Date(isoDate);
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Sao_Paulo',
  });

  const parts = Object.fromEntries(
    formatter.formatToParts(date).map(({ type, value }) => [type, value]),
  );

  return `${parts.day}/${parts.month}/${parts.year} às ${parts.hour}:${parts.minute}`;
}

export function buildProtocolConfirmation(protocol) {
  return {
    protocol,
    title: 'Solicitação registrada',
    message: 'O setor responsável foi notificado e responderia por este canal.',
    disclaimer:
      'Este é um ambiente de demonstração. Nenhuma informação foi enviada ou armazenada.',
  };
}

export function buildDocumentNotice(documentTitle) {
  return {
    title: documentTitle,
    message:
      'Esta é uma prévia demonstrativa. Em uma versão real, o arquivo validado pela Qualidade seria aberto aqui.',
  };
}

