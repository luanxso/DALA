'use client';

import { type SyntheticEvent, useState } from 'react';
import {
  ArrowRight,
  Box,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Download,
  FileCheck2,
  FileText,
  Info,
  MapPin,
  MessageSquareText,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { lotData } from '@/lib/lot-data.mjs';
import {
  buildDocumentNotice,
  buildProtocolConfirmation,
  formatTimelineDate,
} from '@/lib/request-flow.mjs';

const requestTopics = [
  'Previsão de entrega',
  'Certificado de qualidade',
  'Informações técnicas',
  'Situação de uma ocorrência',
  'Falar com o atendimento',
];

const iconByDocument = {
  'inspection-certificate': FileCheck2,
  'material-certificate': ShieldCheck,
  'technical-drawing': FileText,
};

export default function Home() {
  const [requestOpen, setRequestOpen] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [documentOpen, setDocumentOpen] = useState(false);
  const [documentNotice, setDocumentNotice] = useState(
    buildDocumentNotice('Documento'),
  );

  const confirmation = buildProtocolConfirmation('SOL-1042');

  function handleRequestOpenChange(open: boolean) {
    setRequestOpen(open);
    if (!open) {
      window.setTimeout(() => {
        setRequestSent(false);
        setTopic('');
        setMessage('');
      }, 120);
    }
  }

  function handleRequestSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setRequestSent(true);
  }

  function showDocument(title: string) {
    setDocumentNotice(buildDocumentNotice(title));
    setDocumentOpen(true);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="demo-strip">
        <Sparkles aria-hidden="true" />
        <span>Ambiente demonstrativo</span>
        <span aria-hidden="true">•</span>
        <span>Dados fictícios</span>
      </div>

      <header className="site-header">
        <div className="shell flex items-center justify-between gap-4">
          <a className="brand" href="#top" aria-label="TechParts — início">
            <span className="brand-mark" aria-hidden="true">
              TP
            </span>
            <span>
              <strong>TechParts</strong>
              <small>Rastreabilidade</small>
            </span>
          </a>
          <Badge className="status-online">
            <span className="status-dot" aria-hidden="true" />
            Sistema atualizado
          </Badge>
        </div>
      </header>

      <main id="top" className="shell page-grid">
        <section className="primary-column" aria-label="Acompanhamento do lote">
          <div className="lot-heading">
            <div>
              <p className="eyebrow">Acompanhamento do lote</p>
              <h1>{lotData.lot}</h1>
              <p>{lotData.product}</p>
            </div>
            <Badge variant="outline" className="order-badge">
              Pedido {lotData.order}
            </Badge>
          </div>

          <Card className="status-card" id="lot-summary">
            <CardHeader>
              <div className="status-card-icon" aria-hidden="true">
                <PackageCheck />
              </div>
              <div>
                <CardDescription>Situação atual</CardDescription>
                <CardTitle>{lotData.status}</CardTitle>
              </div>
              <CardAction>
                <Badge className="on-time-badge">
                  <Check aria-hidden="true" />
                  {lotData.statusMessage}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <Progress value={lotData.progress} className="lot-progress">
                <ProgressLabel>Jornada concluída</ProgressLabel>
                <ProgressValue>{() => `${lotData.progress}%`}</ProgressValue>
              </Progress>

              <div className="status-meta">
                <div>
                  <span className="meta-icon" aria-hidden="true">
                    <CalendarDays />
                  </span>
                  <span>
                    <small>Previsão de entrega</small>
                    <strong>{lotData.deliveryEstimate}</strong>
                  </span>
                </div>
                <div>
                  <span className="meta-icon" aria-hidden="true">
                    <Box />
                  </span>
                  <span>
                    <small>Quantidade</small>
                    <strong>{lotData.quantity}</strong>
                  </span>
                </div>
              </div>

              <p className="last-update">
                <Clock3 aria-hidden="true" /> Última atualização: {lotData.lastUpdate}
              </p>
            </CardContent>
          </Card>

          <section className="section-block" id="timeline" aria-labelledby="timeline-title">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Rastreabilidade</p>
                <h2 id="timeline-title">Caminho do produto</h2>
              </div>
              <span className="stage-count">8 etapas</span>
            </div>

            <ol className="timeline-list">
              {lotData.timeline.map((stage, index) => (
                <li
                  key={stage.id}
                  className={`timeline-item timeline-${stage.state}${
                    stage.hasOccurrence ? ' timeline-occurrence' : ''
                  }`}
                >
                  <span className="timeline-marker" aria-hidden="true">
                    {stage.state === 'complete' ? <Check /> : <MapPin />}
                  </span>
                  <details open={stage.state === 'current'}>
                    <summary>
                      <span>
                        <strong>{stage.label}</strong>
                        <small>
                          {stage.sector} · {formatTimelineDate(stage.timestamp)}
                        </small>
                      </span>
                      {stage.hasOccurrence && (
                        <Badge className="occurrence-badge">Ocorrência</Badge>
                      )}
                      {stage.state === 'current' && (
                        <Badge className="current-badge">Agora</Badge>
                      )}
                      <ChevronDown className="summary-chevron" aria-hidden="true" />
                    </summary>
                    <p>{stage.detail}</p>
                  </details>
                  {index < lotData.timeline.length - 1 && (
                    <span className="timeline-line" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
          </section>

          <Card className="quality-card">
            <CardHeader>
              <div className="quality-icon" aria-hidden="true">
                <ShieldCheck />
              </div>
              <div>
                <CardDescription>Histórico de qualidade</CardDescription>
                <CardTitle>{lotData.qualityOccurrence.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p>{lotData.qualityOccurrence.summary}</p>
              <p className="quality-resolution">
                <CheckCircle2 aria-hidden="true" />
                <span>{lotData.qualityOccurrence.resolution}</span>
              </p>
            </CardContent>
          </Card>
        </section>

        <aside className="secondary-column" aria-label="Informações complementares">
          <Card id="details" className="detail-card">
            <CardHeader>
              <CardTitle>Detalhes do produto</CardTitle>
              <CardDescription>Dados vinculados ao lote</CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="details-list">
                {lotData.details.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>

          <Card id="documents" className="documents-card">
            <CardHeader>
              <CardTitle>Documentos do lote</CardTitle>
              <CardDescription>Registros centralizados e disponíveis</CardDescription>
            </CardHeader>
            <CardContent className="document-list">
              {lotData.documents.map((document) => {
                const DocumentIcon =
                  iconByDocument[document.id as keyof typeof iconByDocument];
                return (
                  <button
                    type="button"
                    key={document.id}
                    className="document-button"
                    onClick={() => showDocument(document.label)}
                  >
                    <span className="document-icon" aria-hidden="true">
                      <DocumentIcon />
                    </span>
                    <span>
                      <strong>{document.label}</strong>
                      <small>{document.meta}</small>
                    </span>
                    <Download aria-hidden="true" />
                  </button>
                );
              })}
            </CardContent>
          </Card>

          <Card className="request-card">
            <CardHeader>
              <div className="request-icon" aria-hidden="true">
                <MessageSquareText />
              </div>
              <CardTitle>Precisa de outra informação?</CardTitle>
              <CardDescription>
                Registre uma solicitação para o setor responsável.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                size="lg"
                className="request-button"
                onClick={() => setRequestOpen(true)}
              >
                Solicitar informação <ArrowRight aria-hidden="true" />
              </Button>
            </CardContent>
          </Card>

          <div className="security-note">
            <ShieldCheck aria-hidden="true" />
            <p>
              <strong>Consulta segura</strong>
              <span>Somente informações autorizadas deste pedido são exibidas.</span>
            </p>
          </div>
        </aside>
      </main>

      <footer className="site-footer">
        <div className="shell">
          <span>TechParts Industrial</span>
          <span>Protótipo acadêmico · SENAI</span>
        </div>
      </footer>

      <Dialog open={requestOpen} onOpenChange={handleRequestOpenChange}>
        <DialogContent className="request-dialog" showCloseButton={false}>
          {!requestSent ? (
            <form onSubmit={handleRequestSubmit}>
              <DialogHeader>
                <div className="dialog-icon" aria-hidden="true">
                  <MessageSquareText />
                </div>
                <DialogTitle>Solicitar informação</DialogTitle>
                <DialogDescription>
                  A solicitação será vinculada ao lote {lotData.lot}.
                </DialogDescription>
              </DialogHeader>

              <div className="form-fields">
                <label htmlFor="request-topic">Qual informação você precisa?</label>
                <Select value={topic} onValueChange={(value) => setTopic(value ?? '')}>
                  <SelectTrigger id="request-topic" className="form-select">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    {requestTopics.map((requestTopic) => (
                      <SelectItem key={requestTopic} value={requestTopic}>
                        {requestTopic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <label htmlFor="request-message">
                  Complemento <span>(opcional)</span>
                </label>
                <Textarea
                  id="request-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Descreva sua dúvida em poucas palavras"
                  rows={4}
                />
                <p className="form-notice">
                  <Info aria-hidden="true" />
                  Demonstração: nenhum dado será enviado ou armazenado.
                </p>
              </div>

              <DialogFooter>
                <DialogClose render={<Button type="button" variant="outline" size="lg" />}>
                  Cancelar
                </DialogClose>
                <Button type="submit" size="lg" disabled={!topic}>
                  Registrar solicitação
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <div className="success-state" id="request-success">
              <div className="success-icon" aria-hidden="true">
                <Check />
              </div>
              <DialogHeader>
                <DialogTitle>{confirmation.title}</DialogTitle>
                <DialogDescription>{confirmation.message}</DialogDescription>
              </DialogHeader>
              <div className="protocol-card">
                <span>Protocolo</span>
                <strong>{confirmation.protocol}</strong>
              </div>
              <p className="success-disclaimer">{confirmation.disclaimer}</p>
              <DialogClose render={<Button size="lg" className="w-full" />}>
                Concluir
              </DialogClose>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={documentOpen} onOpenChange={setDocumentOpen}>
        <DialogContent className="document-dialog" showCloseButton={false}>
          <DialogHeader>
            <div className="dialog-icon document-dialog-icon" aria-hidden="true">
              <FileText />
            </div>
            <DialogTitle>{documentNotice.title}</DialogTitle>
            <DialogDescription>{documentNotice.message}</DialogDescription>
          </DialogHeader>
          <div className="sample-document" aria-hidden="true">
            <span className="sample-seal">TP</span>
            <span className="sample-line sample-line-long" />
            <span className="sample-line" />
            <span className="sample-line sample-line-short" />
          </div>
          <DialogFooter>
            <DialogClose render={<Button size="lg" className="w-full" />}>
              Entendi
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
