import React from 'react';
import Layout from '../components/layouts/page';
import Meta from '../components/meta';

const UsagePage = () => {
  const title = 'Показания к применению';
  return (
    <Layout>
      <Meta title={title} />

      <h3 className="text-3xl font-bold leading-none mb-3 text-center">
        {title}
      </h3>
      <hr />
      <div className="container mx-auto px-2 pt-4 text-xl text-justify">
        <div>
          <p className="buyDescription">
            <b>«Алтайсорбент»</b> применяют как эффективное профилактическое и
            вспомогательное средство при лечении заболеваний, сопровождающихся
            интоксикацией, в частности:
          </p>
        </div>
        <ul className="list-disc lg:ml-10 buyDescription">
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
        <br />
        <p>
          <i>
            «Алтайорбент» зарегистрирован как биологически активная добавка. Не
            является лекарственным средством.
          </i>
        </p>
      </div>
    </Layout>
  );
};

export default UsagePage;
