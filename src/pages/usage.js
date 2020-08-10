import React from 'react';
import Layout from '../components/layouts/page';
import Meta from '../components/meta';

const UsagePage = () => {
  const title = 'Применение';
  return (
    <Layout>
      <Meta title={title} />
      <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3 text-center">
        {title}
      </h3>
      <div className="container mx-auto px-2 pt-4 text-gray-700 text-xl text-justify">
        <p>
          «Алтайсорбент» применяют как эффективное профилактическое и
          вспомогательное средство при лечении заболеваний, сопровождающихся
          интоксикацией, в частности:
        </p>
        <ul className="list-disc lg:ml-10">
          <li>
            выведении из организма солей тяжелых металлов и радионуклидов,
          </li>
          <li>пищевых, химических, медикаментозных отравлениях,</li>
          <li>смягчении побочных эффектов лучевой и химиотерапии,</li>
          <li>снятии алкогольной интоксикации (похмелье)</li>
          <li>
            заболеваниях желудочно- кишечного такта (гастрит, язвенная болезнь
            желудка, дисбактериоз и др)
          </li>
          <li>
            метеоризме (вздутие живота), диспепсических недугах (рвота, изжога,
            отрыжка),
          </li>
          <li>
            аллергических заболеваниях (поллиноз, пищевая и лекарственная
            аллергии),
          </li>
          <li>артериосклерозах,</li>
          <li>заболеваниях кожного покрова (экзема, псориаз),</li>
          <li>нарушении обмена веществ, в том числе ожирении,</li>
          <li>токсикозе беременных,</li>
          <li>пародонтозе,</li>
          <li>лечении кожных опрелостей, пролежней, ран, ожогов и др.</li>
        </ul>
        <p>
          «Алтайорбент» зарегистрирован как биологически активная добавка. Не
          является лекарственным средством.
        </p>
      </div>

          <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3 mt-10 text-center">
              Инструкция по применению сорбента
              БАД «Алтайсорбент»
          </h3>

          <div className="container mx-auto px-2 pt-4 text-gray-700 text-xl text-justify">
              <p>
                  Состав: природный минерал монтмориллонит.
                <br/>
                Описание: порошок от светло-розового до светло-серого цвета,
                без постороннего запаха, слегка вяжущего вкуса.
                <br/>Показания к применению: профилактическое и
                вспомогательное средство (в качестве энтеросорбента) при:
                <br/>- дефиците и дисбалансе макро- и микроэлементов;
                <br/>- медикаментозной, алкогольной, химической и аллергической интоксикациях;
                <br/>- пищевых токсикоинфекциях;
                <br/>- выводе из организма солей тяжелых металлов, радионуклидов,свободных радикалов и шлаков;
                <br/>- заболеваниях и расстройствах желудочно-кишечного тракта.
                <br/>Способ применения и дозы:
                <br/>Детям: 14 лет и старше - по 1г (1 пакетик) 2-3 раза в день.
                <br/>Взрослым: по 1г (1пакетик) 3 раза в день. В средней и тяжелой степени состояния до 3г (3 пакетика) 3 раза в день. В профилактических целях 1-2г (1-2 пакетика) в день.
                <br/>Необходимую дозу препарата развести до получения однородной суспензии в ½ стакана кипяченой остуженной воды.
                <br/>Курс приема: 15 дней - прием; 5 дней - перерыв; 15 дней - прием.
                <br/>Повторный курс возможен через 3-4 недели.
                <br/>Противопоказания: индивидуальная непереносимость.
                <br/>Побочные действия: в отдельных случаях отмечаются запоры. Прием препарата можно продолжить, уменьшив дозировку.
                <br/>Взаимодействие с лекарственными средствами: рекомендуется принимать БАД «Алтайсорбент» за 1,5-2 часа до или после приема лекарственных средств.
                <br/>Форма выпуска: пакетики по 1г .
                <br/>Условия хранения: в сухом, защищенном от запахов и токсических веществ месте при комнатной температуре.
                <br/>Срок годности: 3 года.
                <br/>Изготовитель: ТОО «Арника», 070500, ВКО, Глубоковский район, п.Глубокое, ул. Пирогова, д.8, Республика Казахстан.
                <br/>Компания, принимающая претензии: ТОО «Арника», 070016, г.Усть-Каменогорск, ул. Утепова, 13-46, Республика Казахстан, телефон :&nbsp; +7 (777) 989-89-98
            </p>
          </div>
    </Layout>
  );
};

export default UsagePage;
