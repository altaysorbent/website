import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Description = () => {
  const tabClassName = 'font-bold text-xl mb-2 text-gray-800';
  const tabPanelClassName = 'sm:text-base text-xl';
  return (
    <Tabs>
      <TabList>
        <Tab>
          <div className={tabClassName}>Описание</div>
        </Tab>
        <Tab>
          <div className={tabClassName}>Инструкция</div>
        </Tab>
        <Tab>
          <div className={tabClassName}>Показания к применению</div>
        </Tab>
      </TabList>

      <TabPanel>
        <div className={tabPanelClassName}>
          <p>
            <b>Состав:</b>
          </p>
          <p>природный минерал монтмориллонит.</p>
          <p>
            <b>Описание:</b>
          </p>
          <p>порошок от светло-розового до светло-серого цвета, без постороннего запаха, слегка вяжущего вкуса.</p>
          <p>
            <b>Форма выпуска:</b> пакетики по 1г .
          </p>
          <p>
            <b>Условия хранения:</b>
          </p>
          <p>в сухом, защищенном от запахов и токсических веществ месте при комнатной температуре.</p>
          <p>
            <b>Срок годности:</b> 3 года.
          </p>
          <p>
            <b>Изготовитель:</b>
          </p>
          <p>ТОО «Арника», 070500, ВКО, Глубоковский район, п.Глубокое, ул. Пирогова, д.8, Республика Казахстан.</p>
          <p>
            <b>Компания, принимающая оплату за продукцию "АлтайСорбент" и претензии:</b>
          </p>
          <p>
            ТОО «Актас», 070004, г.Усть-Каменогорск, Ауэзова 14/1 офис 306, Республика Казахстан, телефон:{' '}
            <a className="text-green-700 block" href="tel:+77779898998">
              +7 (777) 989-89-98
            </a>
          </p>
        </div>
      </TabPanel>
      <TabPanel>
        <div className={tabPanelClassName}>
          <p className="mb-2">
            <b> Способ применения и дозы:</b>
          </p>
          <div>
            <p>
              <b>Детям:</b> 14 лет и старше - по 1г (1 пакетик) 2-3 раза в день.
            </p>
            <p>
              <b>Взрослым:</b> по 1г (1пакетик) 3 раза в день. В средней и тяжелой степени состояния до 3г (3 пакетика)
              3 раза в день. В профилактических целях 1-2г (1-2 пакетика) в день.
            </p>
            <p>
              Необходимую дозу препарата развести до получения однородной суспензии в ½ стакана кипяченой остуженной
              воды.
            </p>
            <p>
              <b>Курс приема:</b> 15 дней - прием; 5 дней - перерыв; 15 дней - прием. Повторный курс возможен через 3-4
              недели.
            </p>
          </div>
          <p>
            <b>Противопоказания:</b> индивидуальная непереносимость.
          </p>
          <p>
            <b>Побочные действия:</b>
          </p>
          <p>
            В отдельных случаях отмечаются запоры. Прием препарата можно продолжить, уменьшив дозировку. Взаимодействие
            с лекарственными средствами: рекомендуется принимать БАД «Алтайсорбент» за 1,5-2 часа до или после приема
            лекарственных средств.
          </p>
        </div>
      </TabPanel>
      <TabPanel>
        <div className={tabPanelClassName}>
          <p>
            <b>«Алтайсорбент»</b> применяют как эффективное профилактическое и вспомогательное средство при лечении
            заболеваний, сопровождающихся интоксикацией, в частности:
          </p>
          <ul className="list-disc lg:ml-5">
            <li>выведении из организма солей тяжелых металлов и радионуклидов</li>
            <li>пищевых, химических, медикаментозных отравлениях</li>
            <li>смягчении побочных эффектов лучевой и химиотерапии</li>
            <li>снятии алкогольной интоксикации (похмелье)</li>
            <li>заболеваниях желудочно-кишечного тракта (гастрит, язвенная болезнь желудка, дисбактериоз и др.)</li>
            <li>метеоризме (вздутие живота), диспепсических недугах (рвота, изжога, отрыжка)</li>
            <li>аллергических заболеваниях (поллиноз, пищевая и лекарственная аллергии)</li>
            <li>артериосклерозах</li>
            <li>заболеваниях кожного покрова (экзема, псориаз)</li>
            <li>нарушении обмена веществ, в том числе ожирении</li>
            <li>токсикозе беременных</li>
            <li>пародонтозе</li>
            <li>лечении кожных опрелостей, пролежней, ран, ожогов и др.</li>
          </ul>
        </div>
      </TabPanel>
    </Tabs>
  );
};

export default Description;
