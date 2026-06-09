// Задания разбиты по режимам: dating (Знакомство), flirt (Флирт), fire (Огонь)
// Каждый уровень: easy=10 очков, medium=20, hard=30

export const tasksByMode = {
  dating: [
    // easy
    { id: 'd1', mode: 'dating', level: 'easy', points: 10, text: 'Расскажи три интересных факта о себе' },
    { id: 'd2', mode: 'dating', level: 'easy', points: 10, text: 'Назови своё любимое место в городе и объясни почему' },
    { id: 'd3', mode: 'dating', level: 'easy', points: 10, text: 'Покажи самую смешную фотографию в телефоне' },
    { id: 'd4', mode: 'dating', level: 'easy', points: 10, text: 'Расскажи о самом весёлом приключении этого года' },
    { id: 'd5', mode: 'dating', level: 'easy', points: 10, text: 'Назови три вещи, без которых не можешь прожить и дня' },
    { id: 'd6', mode: 'dating', level: 'easy', points: 10, text: 'Спой строчку из любимой песни' },
    { id: 'd7', mode: 'dating', level: 'easy', points: 10, text: 'Покажи своё лучшее хобби жестами — остальные угадывают' },
    { id: 'd8', mode: 'dating', level: 'easy', points: 10, text: 'Расскажи о своей мечте детства' },
    { id: 'd9', mode: 'dating', level: 'easy', points: 10, text: 'Сделай комплимент человеку напротив' },
    { id: 'd10', mode: 'dating', level: 'easy', points: 10, text: 'Изобрази своё настроение прямо сейчас без слов' },
    // medium
    { id: 'd11', mode: 'dating', level: 'medium', points: 20, text: 'Расскажи о самом неловком свидании в жизни' },
    { id: 'd12', mode: 'dating', level: 'medium', points: 20, text: 'Назови качество, которое ты ищешь в партнёре' },
    { id: 'd13', mode: 'dating', level: 'medium', points: 20, text: 'Изобрази идеальный первый день знакомства пантомимой' },
    { id: 'd14', mode: 'dating', level: 'medium', points: 20, text: 'Что бы ты делал(а) в последний день жизни — расскажи честно' },
    { id: 'd15', mode: 'dating', level: 'medium', points: 20, text: 'Расскажи о своём первом влюблении (без имён)' },
    { id: 'd16', mode: 'dating', level: 'medium', points: 20, text: 'Покажи свой список контактов — пусть компания угадает, кто самый важный' },
    { id: 'd17', mode: 'dating', level: 'medium', points: 20, text: 'Назови три черты идеального вечера с незнакомым человеком' },
    { id: 'd18', mode: 'dating', level: 'medium', points: 20, text: 'Расскажи о месте, куда хочешь поехать с кем-то особенным' },
    // hard
    { id: 'd19', mode: 'dating', level: 'hard', points: 30, text: 'Позвони другу и скажи, что познакомился(ась) с кем-то особенным — прямо сейчас' },
    { id: 'd20', mode: 'dating', level: 'hard', points: 30, text: 'Напиши и зачитай вслух мини-письмо кому-то из компании' },
    { id: 'd21', mode: 'dating', level: 'hard', points: 30, text: 'Расскажи самую большую тайну, которую готов(а) открыть незнакомцу' },
    { id: 'd22', mode: 'dating', level: 'hard', points: 30, text: 'Опиши свой идеальный партнёр в трёх словах и объясни каждое' },
  ],

  flirt: [
    // easy
    { id: 'f1', mode: 'flirt', level: 'easy', points: 10, text: 'Подмигни выбранному игроку максимально соблазнительно' },
    { id: 'f2', mode: 'flirt', level: 'easy', points: 10, text: 'Скажи комплимент глазам человека напротив' },
    { id: 'f3', mode: 'flirt', level: 'easy', points: 10, text: 'Спой серенаду одной строчкой любому игроку' },
    { id: 'f4', mode: 'flirt', level: 'easy', points: 10, text: 'Напиши имя самого привлекательного в компании на листе — покажи всем' },
    { id: 'f5', mode: 'flirt', level: 'easy', points: 10, text: 'Повтори самую флиртовую фразу из кино' },
    { id: 'f6', mode: 'flirt', level: 'easy', points: 10, text: 'Задай любому игроку один личный вопрос — он обязан ответить честно' },
    { id: 'f7', mode: 'flirt', level: 'easy', points: 10, text: 'Изобрази "влюблённого" без слов — остальные угадывают, в кого' },
    { id: 'f8', mode: 'flirt', level: 'easy', points: 10, text: 'Скажи фразу "ты мне нравишься" как будто это самая важная новость в мире' },
    { id: 'f9', mode: 'flirt', level: 'easy', points: 10, text: 'Поменяйся местами с тем, кто кажется тебе самым интересным' },
    { id: 'f10', mode: 'flirt', level: 'easy', points: 10, text: 'Расскажи о качестве любого игрока, которое тебя привлекает' },
    // medium
    { id: 'f11', mode: 'flirt', level: 'medium', points: 20, text: 'Посмотри в глаза выбранному игроку молча 30 секунд — не отводи взгляд' },
    { id: 'f12', mode: 'flirt', level: 'medium', points: 20, text: 'Напиши кому-то из компании сообщение с флиртом прямо сейчас' },
    { id: 'f13', mode: 'flirt', level: 'medium', points: 20, text: 'Скажи выбранному игроку, что тебе в нём нравится — максимально серьёзно' },
    { id: 'f14', mode: 'flirt', level: 'medium', points: 20, text: 'Расскажи, как бы ты познакомился(ась) с выбранным игроком в кафе' },
    { id: 'f15', mode: 'flirt', level: 'medium', points: 20, text: 'Покажи свой самый "убойный" флиртовый танец 20 секунд' },
    { id: 'f16', mode: 'flirt', level: 'medium', points: 20, text: 'Придумай и расскажи романтическую историю с любым игроком в главной роли' },
    { id: 'f17', mode: 'flirt', level: 'medium', points: 20, text: 'Скажи выбранному игроку три причины, почему они тебе интересны' },
    { id: 'f18', mode: 'flirt', level: 'medium', points: 20, text: 'Изобрази сцену "ты пригласил(а) кого-то на свидание" — только жестами' },
    // hard
    { id: 'f19', mode: 'flirt', level: 'hard', points: 30, text: 'Напиши выбранному игроку в соцсеть романтичное сообщение — при всех' },
    { id: 'f20', mode: 'flirt', level: 'hard', points: 30, text: 'Нарисуй портрет выбранного игрока за 60 секунд и покажи ему' },
    { id: 'f21', mode: 'flirt', level: 'hard', points: 30, text: 'Спой серенаду выбранному игроку — минимум 4 строчки' },
    { id: 'f22', mode: 'flirt', level: 'hard', points: 30, text: 'Расскажи, что бы ты сделал(а) на первом свидании с выбранным игроком' },
  ],

  fire: [
    // easy
    { id: 'h1', mode: 'fire', level: 'easy', points: 10, text: 'Поцелуй выбранного игрока в щёку' },
    { id: 'h2', mode: 'fire', level: 'easy', points: 10, text: 'Обними выбранного игрока и держи 10 секунд' },
    { id: 'h3', mode: 'fire', level: 'easy', points: 10, text: 'Скажи вслух своё "самое смелое" желание' },
    { id: 'h4', mode: 'fire', level: 'easy', points: 10, text: 'Сядь как можно ближе к выбранному игроку на 2 круга' },
    { id: 'h5', mode: 'fire', level: 'easy', points: 10, text: 'Поиграй в "правда или действие" с выбранным: задай один острый вопрос' },
    { id: 'h6', mode: 'fire', level: 'easy', points: 10, text: 'Возьми выбранного игрока за руку на 1 минуту' },
    { id: 'h7', mode: 'fire', level: 'easy', points: 10, text: 'Сделай массаж плеч выбранному игроку 30 секунд' },
    { id: 'h8', mode: 'fire', level: 'easy', points: 10, text: 'Угадай знак зодиака выбранного по характеру — он скажет, угадал ли ты' },
    { id: 'h9', mode: 'fire', level: 'easy', points: 10, text: 'Сделай "утиную губу" на совместном фото с выбранным' },
    { id: 'h10', mode: 'fire', level: 'easy', points: 10, text: 'Шёпотом скажи выбранному комплимент на ухо' },
    // medium
    { id: 'h11', mode: 'fire', level: 'medium', points: 20, text: 'Поцелуй выбранного в руку — медленно и торжественно' },
    { id: 'h12', mode: 'fire', level: 'medium', points: 20, text: 'Сыграй в "морской бой" взглядами с выбранным 1 минуту — кто первый улыбнётся, проиграл' },
    { id: 'h13', mode: 'fire', level: 'medium', points: 20, text: 'Расскажи о самом волнующем моменте с кем-то, кто тебе нравился' },
    { id: 'h14', mode: 'fire', level: 'medium', points: 20, text: 'Накорми выбранного игрока любой едой со стола с закрытыми глазами' },
    { id: 'h15', mode: 'fire', level: 'medium', points: 20, text: 'Напиши пальцем на спине выбранного слово — пусть угадает' },
    { id: 'h16', mode: 'fire', level: 'medium', points: 20, text: 'Спой "самую романтичную" песню, которую знаешь — выбранному в глаза' },
    { id: 'h17', mode: 'fire', level: 'medium', points: 20, text: 'Покажи самую дерзкую позу для фото с выбранным' },
    { id: 'h18', mode: 'fire', level: 'medium', points: 20, text: 'Расскажи о своей самой смелой фантазии о ком-то из компании (без имён)' },
    // hard
    { id: 'h19', mode: 'fire', level: 'hard', points: 30, text: 'Поцелуй выбранного в губы — или объясни, почему нет, и получи наказание' },
    { id: 'h20', mode: 'fire', level: 'hard', points: 30, text: 'Потанцуй медленный танец с выбранным 1 минуту' },
    { id: 'h21', mode: 'fire', level: 'hard', points: 30, text: 'Опубликуй совместное фото с выбранным и подпись "моя симпатия"' },
    { id: 'h22', mode: 'fire', level: 'hard', points: 30, text: 'Сыграй в "поцелуй или правда" с выбранным — он выбирает' },
  ],
};

// Наказания за провал задания
export const punishments = [
  { id: 'p1', text: 'Выпей залпом стакан воды' },
  { id: 'p2', text: 'Сделай 15 приседаний' },
  { id: 'p3', text: 'Пой следующие 2 минуты только шёпотом' },
  { id: 'p4', text: 'Изобрази курицу 30 секунд' },
  { id: 'p5', text: 'Расскажи самый неловкий момент этого месяца' },
  { id: 'p6', text: 'Поменяйся телефонами с соседом на один круг' },
  { id: 'p7', text: 'Говори с французским акцентом весь следующий круг' },
  { id: 'p8', text: 'Напиши статус во ВКонтакте "Я облажался(ась)" на 10 минут' },
  { id: 'p9', text: 'Сделай 10 прыжков на месте прямо сейчас' },
  { id: 'p10', text: 'Обращайся ко всем на "Вы" до конца игры' },
  { id: 'p11', text: 'Спой куплет любой детской песни' },
  { id: 'p12', text: 'Позвони другу и скажи, что скучаешь по нему — прямо сейчас' },
  { id: 'p13', text: 'Снимай всё с левой руки следующие 5 минут' },
  { id: 'p14', text: 'Расскажи анекдот — если не смешной, повтори другой' },
  { id: 'p15', text: 'Пропусти следующий ход и просто смотри на всех молча' },
];

export function getRandomTask(mode = 'dating') {
  const list = tasksByMode[mode] || tasksByMode.dating;
  return list[Math.floor(Math.random() * list.length)];
}

export function getRandomPunishment() {
  return punishments[Math.floor(Math.random() * punishments.length)];
}

// Backward-compat для старого кода
export const tasks = [
  ...tasksByMode.dating,
  ...tasksByMode.flirt,
  ...tasksByMode.fire,
];
