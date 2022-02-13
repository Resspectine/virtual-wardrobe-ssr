import { build, fake, sequence } from '@jackfranklin/test-data-bot';
import { Garment, Tag, User } from '.';

export const userBuilder = build<User>({
  fields: {
    email: fake(f => f.internet.email()),
    password: fake(f => f.internet.password()),
    name: fake(f => f.internet.userName()),
  },
});

export const tagBuilder = build<Tag>({
  fields: {
    title: fake(f => f.lorem.word(4)),
  },
});

export const garmentBuilder = build<Garment>({
  fields: {
    title: sequence(x => `Garment ${x}`),
    description: fake(f => f.lorem.words(4)),
    price: fake(f =>
      f.datatype.number({
        min: 50,
        max: 150,
      })
    ),
    tag: sequence(x => `Tag${x}`),
  },
});
