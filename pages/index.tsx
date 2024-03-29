import React from 'react';
import Link from 'next/link';
import { Button } from '@material-ui/core';

import Meta from 'components/Meta';
import MainLayout from 'layouts/Main';

const IndexPage = (): JSX.Element => {
  return (
    <MainLayout>
      <Meta title="Главная" />
      <section id="sorbent">
        <div className="py-10">
          <div className="container max-w-6xl px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center text-white">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h1 className="mb-4 text-5xl font-bold leading-tight">
                Алтайсорбент - здоровья важный элемент!
              </h1>
              <p className="text-xl mb-10">
                100% натуральный кремнесодержащий энтеросорбент с широким
                спектром действия, изготавливается из природного минерала
                монтмориллонита.
              </p>
              <Link href="/buy">
                <Button color="secondary" size="large" variant="contained">
                  Купить
                </Button>
              </Link>
            </div>
            <div className="w-full md:w-1/2 py-6 flex justify-end">
              <iframe
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                frameBorder="0"
                height="315"
                src="https://www.youtube.com/embed/vYluBzK-ddI?rel=0"
                title="AltaySorbent movie"
                width="560"
                allowFullScreen
              />
            </div>
            <div className="w-full text-xl">
              <p className="mb-2">
                «Наша задача состоит в том , чтобы найти правильный баланс между
                приемом лекарств и использованием натуральных сорбентов, которые
                способны защитить наш организм и свести к минимуму негативные
                последствия лечения»
              </p>
              <p>
                Выдержка из статьи{' '}
                <Link href={`/blog/princip-balansa-v-medicine`}>
                  <a className="border-b border-white cursor-pointer">
                    «Принцип баланса в медицине»
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="relative">
          <svg
            version="1.1"
            viewBox="0 0 1428 174"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
              <g
                fill="#FFFFFF"
                fillRule="nonzero"
                transform="translate(-2.000000, 44.000000)"
              >
                <path
                  d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                  opacity="0.100000001"
                />
                <path
                  d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                  opacity="0.100000001"
                />
                <path
                  d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                  id="Path-4"
                  opacity="0.200000003"
                />
              </g>
              <g
                fill="#FFFFFF"
                fillRule="nonzero"
                transform="translate(-4.000000, 76.000000)"
              >
                <path d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z" />
              </g>
            </g>
          </svg>
        </div>
      </section>
      <section className="bg-white border-b py-8" id="specification">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-wrap flex-col-reverse md:flex-row">
            <div className="w-full md:w-2/3 p-6">
              <h3 className="text-3xl font-bold leading-none mb-3">
                Уникальный продукт
              </h3>
              <p className="text-xl mb-8 text-justify">
                Алтайсорбент – натуральный сорбент из элитных бентонитовых глин
                (содержание минерала монтмориллонита не менее 95 - 98%). В
                процессе производства бентонитовые глины обрабатываются по
                специально разработанной и запатентованной технологии, что
                позволяет максимально сохранить их природные свойства. Не
                используются какие-либо добавки, ароматизаторы, красители и
                консерванты...
              </p>
            </div>
            <div className="w-full md:w-1/3 p-6">
              <img
                alt="Глина"
                className="mx-auto"
                src="/images/naturs.png"
                style={{
                  height: '300px',
                  width: 'auto',
                }}
              />
            </div>
          </div>
          <div className="flex flex-wrap flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-6">
              <img
                alt="Йога"
                className="mx-auto"
                src="/images/yoga.jpg"
                style={{
                  height: '300px',
                  width: 'auto',
                }}
              />
            </div>
            <div className="w-full md:w-2/3 p-6 ">
              <div className="align-middle">
                <h3 className="text-3xl font-bold leading-none mb-3">
                  Идеальный Сорбент
                </h3>
                <p className="text-xl mb-2 lg:mb-8 text-justify">
                  «Алтайсорбент» не только очищает организм, но и регулирует
                  баланс макро и микроэлементов.
                  <br />
                  Сорбент избирательно работает при употреблении внутрь. Он
                  обволакивает слизистую оболочку желудка и активно выводит
                  патогенные микроорганизмы, токсины, соли тяжелых металлов,
                  радионуклиды, аллергены и другие раздражители.
                  <br />
                  При этом не поглощает белки, ферменты, витамины. Не страдает и
                  полезная микрофлора кишечника, более того, сорбент
                  способствует ее росту.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8 border-b">
        <div className="container max-w-6xl mx-auto px-2 pt-4">
          <div className="flex flex-wrap flex-col-reverse md:flex-row">
            <div className="w-full md:w-2/3 p-6">
              <h3 className="w-full my-2 text-3xl font-bold leading-none text-center">
                А знаете ли Вы?
              </h3>
              <p className="text-xl mb-3 text-justify">
                Бентонитовые глины для сырья добывают на динозавровом
                месторождении в Восточно-Казахстанской Области. Своё название
                месторождение получило в связи с находкой большого количества
                остатков динозавровых яиц
              </p>
            </div>
            <div className="w-full md:w-1/3 p-6 flex justify-center">
              <img
                alt=""
                src="/images/dino.png"
                style={{
                  width: '200px',
                  height: '150px',
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default IndexPage;
