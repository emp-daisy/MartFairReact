import _ from 'lodash';

export const validateObject = (obj, props) => {
  const propsTrue = _.chain(props)
    .map(prop => _.has(obj, prop) && !!obj[prop])
    .without(false)
    .value();
  return (propsTrue.length === props.length);
};

export default validateObject;
