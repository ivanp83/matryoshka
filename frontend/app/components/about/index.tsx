"use client";
import Image from "next/image";

export default function Index() {
  return (
    <section>
      <style jsx>{`
        section {
          width: 100%;
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: var(--space-med);
          height: fit-content;
          margin: 0 auto;
          max-width: 1000px;
          width: auto;
        }
        h1 {
          grid-column: 1/3;
          grid-row: 1;
          z-index: 1;
          margin-top: var(--space-small);
          text-align: center;
        }
        h1 .red {
          color: var(--main-red);
        }
        .left {
          grid-column: 1/2;
          display: grid;
          grid-gap: var(--space-small);
          height: fit-content;
        }
        .image {
          position: relative;
          width: 20rem;
          height: 20rem;
        }

        .text {
          grid-column: 2/3;
          height: fit-content;
          width: 100%;
          display: grid;
          grid-gap: var(--space-small);
        }
        @media all and (max-width: 760px) and (orientation: portrait) {
          section {
            grid-gap: var(--space-small);
          }

          .left,
          .text {
            grid-column: 1/3;
          }
          .image {
            width: calc(100vw - var(--space-small) * 2);
            height: calc(100vw - var(--space-small) * 2);
          }
        }
      `}</style>
      <h1>
        Почему бы и да!!! - <span className="red">Why&Yes</span>
      </h1>
      <div className="left">
        <div className="image">
          <Image
            src="/images/1.png"
            alt="Юлиана Легкодумова"
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </div>
        <div className="inst">
          <a href="http://instagram.com/_u/yulianalegkodumova/">
            @yulianalegkodumova
          </a>
        </div>
      </div>

      <div className="text">
        <span>
          Привет! Меня зовут, Юлиана. Мне 35, у меня 4-ро детей и все мои
          драконы мальчики, самому младшему исполнилось 2 месяца. Я люблю цветы,
          уют и красоту вокруг. Я с детства собирала цветы в поле, по дороге
          куда-либо, на даче и т.д. И вот уже в сознательном возрасте посреди
          ночи меня осенило. Сначала пришло название - Матрёшка, русское
          красивое ( всегда поражали иностранные вывески, живем в России а
          вокруг Ля флёр - Дэ флёр) которое ассоциируется с цветами. Так вот
          после названия я решила что хочу вернуться к детскому увлечению.
        </span>

        <span>
          Посмотрела пару роликов на ютуб по сборке букетов, потренировалась и
          разместила свою цветочную мастерскую прям на кухне. Оформила страничку
          в Инстаграм, нашла поставщиков и вот первые букеты собирала друзьям и
          знакомым. Потренировавшись и просмотрев не одну цветочную страницу
          пришло понимание как можно делать красиво и не обычно. v Самыми
          популярными стали мои WOW букеты и композиции с объемными розами.{" "}
        </span>
        <span>
          На сегодняшний день мое маленькое хобби нашло отклик во многих сердцах
          моих постоянных гостей и готово переходить на новый уровень. А это
          большое светлое помещение которое будет похоже на тропический сад
          посреди каменных джунглей, где будем пить с вами чай беседовать на
          разные темы и собирать потрясающей красоты букеты и композиции. Ведь
          все начинается с любви к себе, дому и цветам. ❤️
        </span>
      </div>
    </section>
  );
}
