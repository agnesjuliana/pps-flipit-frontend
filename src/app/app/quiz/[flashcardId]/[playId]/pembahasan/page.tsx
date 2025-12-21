'use client';

import { ArrowLeft, ShieldCheck, AlertTriangle, Info } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import parse, { domToReact, Element, DOMNode } from 'html-react-parser';

// Import helper data mock
import {
  getSimulationItems,
  type MockSimulationItem,
} from '@/lib/data/mockData';
import { Card } from '@/lib/components/Card';
import { cn } from '@/lib/styles/utils';

// --- KOMPONEN PENDUKUNG ---

const MockBrowser = ({
  children,
  url = 'https://mail.google.com',
}: {
  children: React.ReactNode;
  url?: string;
}) => (
  <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
    <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-100 px-4 py-2">
      <div className="flex gap-1.5">
        <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
      </div>
      <div className="mx-2 flex flex-1 items-center gap-2 truncate rounded-md bg-white px-2 py-0.5 text-[10px] text-gray-500 shadow-sm sm:text-xs">
        <div className="h-2 w-2 rounded-full bg-gray-300" />
        {url}
      </div>
    </div>
    <div className="relative flex-1 bg-white p-4 text-sm">{children}</div>
  </div>
);

const SimulatedLink = ({
  text,
  className,
}: {
  text: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        'cursor-not-allowed font-medium opacity-70',
        className || 'text-blue-600 underline'
      )}
    >
      {text}
    </span>
  );
};

export default function PembahasanPage() {
  const params = useParams();
  const router = useRouter();

  // ID Simulasi & Play
  const simulationId = Number(params.flashcardId);
  const playId = Number(params.playId);

  const [items, setItems] = useState<MockSimulationItem[]>([]);

  // Load Soal
  useEffect(() => {
    const data = getSimulationItems(simulationId);
    setItems(data.length > 0 ? data : getSimulationItems(1));
  }, [simulationId]);

  // Config Parser HTML
  const parseOptions = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element && domNode.name === 'a') {
        const className = domNode.attribs.class;
        return (
          <SimulatedLink
            text={domToReact(domNode.children as DOMNode[], parseOptions)}
            className={className}
          />
        );
      }
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-6">
      {/* HEADER */}
      <div className="mx-auto mb-8 max-w-2xl px-6">
        {/* Tombol Back di Header juga diarahkan ke Result agar konsisten */}
        <button
          onClick={() =>
            router.push(`/app/quiz/${simulationId}/${playId}/result`)
          }
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm transition hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Hasil
        </button>

        <h1 className="text-2xl font-bold text-gray-900">
          Pembahasan & Jawaban
        </h1>
        <p className="text-gray-500">
          Review kembali kasus yang telah kamu kerjakan.
        </p>
      </div>

      {/* LIST PEMBAHASAN */}
      <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6">
        {items.map((item, index) => (
          <div key={item.id} className="relative flex flex-col gap-4">
            {/* Nomor Soal */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-base text-sm font-bold text-white">
                {index + 1}
              </div>
              <h3 className="font-semibold text-gray-700">
                {item.scenarioTitle}
              </h3>
            </div>

            <Card className="overflow-hidden border-0 bg-white p-0 shadow-lg ring-1 ring-gray-100">
              {/* BAGIAN 1: STATUS JAWABAN */}
              <div
                className={cn(
                  'flex items-center justify-between px-6 py-4',
                  item.isPhishing
                    ? 'bg-red-50 text-red-700'
                    : 'bg-green-50 text-green-700'
                )}
              >
                <div className="flex items-center gap-3">
                  {item.isPhishing ? (
                    <div className="rounded-full bg-red-100 p-2">
                      <AlertTriangle className="h-6 w-6" />
                    </div>
                  ) : (
                    <div className="rounded-full bg-green-100 p-2">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-bold uppercase opacity-70">
                      Kunci Jawaban
                    </p>
                    <p className="text-lg font-bold">
                      {item.isPhishing ? 'BAHAYA (PHISHING)' : 'AMAN'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2">
                {/* BAGIAN 2: PREVIEW TAMPILAN */}
                <div className="border-b border-gray-100 bg-gray-50 p-4 md:border-b-0 md:border-r">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Tampilan Kasus
                  </p>
                  <div className="aspect-[3/4] w-full overflow-hidden rounded-lg shadow-sm sm:aspect-square">
                    <MockBrowser>
                      {item.htmlContent ? (
                        parse(item.htmlContent, parseOptions)
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-gray-400">
                          No Preview
                        </div>
                      )}
                    </MockBrowser>
                  </div>
                </div>

                {/* BAGIAN 3: PENJELASAN */}
                <div className="flex flex-col justify-center p-6">
                  <div className="mb-2 flex items-center gap-2 text-brand-base">
                    <Info className="h-5 w-5" />
                    <span className="font-bold">Penjelasan</span>
                  </div>

                  <p className="text-sm leading-relaxed text-gray-600">
                    {item.explanation || 'Tidak ada penjelasan tersedia.'}
                  </p>

                  <div className="mt-6 rounded-lg bg-yellow-50 p-3 text-xs text-yellow-800">
                    <strong>Tips Keamanan:</strong>
                    <ul className="mt-1 list-inside list-disc space-y-1">
                      {item.isPhishing ? (
                        <>
                          <li>
                            Jangan pernah klik link dari pengirim tak dikenal.
                          </li>
                          <li>Periksa domain email (typo atau domain aneh).</li>
                        </>
                      ) : (
                        <>
                          <li>
                            Pastikan URL dimulai dengan HTTPS dan domain resmi.
                          </li>
                          <li>
                            Institusi resmi jarang meminta password via email.
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}

        {/* Footer Actions - UPDATE DISINI */}
        <div className="mt-8 flex justify-center pb-8">
          <button
            // Redirect kembali ke halaman Result Flashcard
            onClick={() =>
              router.push(`/app/quiz/${simulationId}/${playId}/result`)
            }
            className="w-full max-w-xs rounded-xl bg-gray-900 py-4 font-bold text-white shadow-xl transition hover:bg-gray-800 active:scale-95"
          >
            Lihat Skor Akhir
          </button>
        </div>
      </div>
    </div>
  );
}
