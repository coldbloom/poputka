import s from './AuthSeparator.module.scss';

export const AuthSeparator = () => {
  return (
    <div className={s.separator}>
      <span className={s.text}>или</span>
    </div>
  );
};