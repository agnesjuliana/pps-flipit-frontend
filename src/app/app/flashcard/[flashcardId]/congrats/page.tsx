import { Button, Image } from '@nextui-org/react';

export default function EncouragePage() {
  return (
    <div className="grid h-screen place-items-center">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-[60px] font-bold text-[#FEC536]">Semangat!</h1>
          <p className=" text-center leading-7">
            <b>Tinggal tiga pertanyaan nih,</b>
            <br />
            kamu pasti bisa kok 🤩
          </p>
          <Image
            src="/assets/app/flashcard/hero.png"
            width={228}
            height={266}
          />
        </div>
        <Button
          fullWidth
          className="rounded-lg bg-[#FEC536] py-2 text-base font-medium text-white"
          size="lg"
        >
          Ayo lanjut !
        </Button>
      </div>
    </div>
  );
}
