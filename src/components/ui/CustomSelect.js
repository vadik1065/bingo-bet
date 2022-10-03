import React from 'react';
import Select, { components } from 'react-select';
import allCountries from '../../countries.json';
import { ReactComponent as Dropdown } from '../../images/dropdown.svg';

const CustomOption = (props) => {
  function getColor() {
    if (props.selectProps.isDark) {
      return '#ffffff'
    } else {
      return '#1c3130'
    }
  }
  return (
    <components.Option {...props}>
      <img 
        src={`https://admin.bingo.bet/assets/flags/4x3/${props.data.code}.svg`} 
        style={{ 
          width: props.selectProps.is4k ? 40 : 20, 
          marginRight: props.selectProps.is4k ? 20 : 10 
        }}
      />
      <div style={{ color: props.isSelected ? '#ffffff' : getColor() }}>
        {props.data.label}
      </div>
    </components.Option>
  )
}

const CustomSingleValue = (props) => {
  return (
    <components.SingleValue {...props}>
      <img 
        src={`https://admin.bingo.bet/assets/flags/4x3/${props.data.code}.svg`} 
        // style={{ 
        //   width: props.selectProps.is4k ? 40 : 20, 
        //   marginRight: props.selectProps.is4k ? 20 : 10 
        // }}
      />
      <div>{props.data.label}</div>
    </components.SingleValue>
  )
}

const CustomDropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <Dropdown 
        className="dropdown-img"
        style={{ 
          // width: '100%', 
          height: props.selectProps.isMobile ? 5 : props.selectProps.is4k ? 14 : 6,
          marginLeft: 0
        }}
      />
    </components.DropdownIndicator>
  );
};

const CustomPlaceholder = (props) => {
  return (
    <components.Placeholder {...props}>
      {!props.isFocused && props.selectProps.placeholder}
    </components.Placeholder>
  );
};

const CustomSelect = (props) => {
  // const options = [
  //   { value: "ai", label: "Anguilla", code: "ai", eng_name: "Anguilla" },
  //   { value: "aq", label: "Antarctica", code: "aq", eng_name: "Antarctica" },
  //   { value: "as", label: "American Samoa", code: "as", eng_name: "American Samoa" },
  // ]
  
  const options = props.options.map(option => {
    if (props.customLabels) {
      const obj = allCountries.find((country) => country.code.toLowerCase() === option.toLowerCase())
      return {
        ...obj,
        code: obj.code.toLowerCase(),
        value: obj.code,
        label: props.customLabels[obj.code],
      }
    } else {
      const obj = allCountries.find((country) => country.code.toLowerCase() === option.toLowerCase())
      return {
        ...obj,
        code: obj.code.toLowerCase(),
        value: obj.code,
        label: obj.eng_name,
      }
    }
  })

  const customStyles = {
    singleValue: (base, state) => ({ 
      ...base, 
      // display: 'flex',
      // alignItems: 'center',
      display: 'grid',
      gridTemplateColumns: state.selectProps.is4k ? '40px 1fr' : '20px 1fr',
      gap: state.selectProps.is4k ? 20 : 10,
      position: 'relative'
    }),
    option: function(base, state) {
      return ({ 
        ...base, 
        display: 'flex', 
        alignItems: 'center',
        height: state.selectProps.is4k ? 80 : 40,
        paddingLeft: state.selectProps.isMobile ? 10 : state.selectProps.is4k ? 30 : 15,
        backgroundColor: state.isSelected ? '#268A00' : state.isFocused ? getOptionBg() : 'transparent',
        "&:hover": { backgroundColor: state.isSelected ? '#268A00' : getOptionBg() },
        color: state.isSelected ? '#ffffff' : '#1C2D31',
        cursor: 'pointer',
        fontSize: state.selectProps.isMobile ? '12px' : state.selectProps.is4k ? '28px' : '14px'
      })
    },
    menu: (base) => ({
      ...base,
      zIndex: 99
    }),
    menuList: (base, state) => ({
      ...base,
      minHeight: state.selectProps.is4k ? 600 : 'inherit',
      backgroundColor: state.selectProps.isDark ? '#1C2D31' : '#ffffff',
      "::-webkit-scrollbar": { width: 0 },
    }),
    control: (base, state) => ({ 
      ...base, 
      // height: '100%',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: state.selectProps.isMobile ? '12px' : state.selectProps.is4k ? '28px' : '14px'
    }),
    valueContainer: (base, state) => ({ 
      ...base, 
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: state.selectProps.isMobile ? 10 : state.selectProps.is4k ? 30 : 15,
      paddingRight: state.selectProps.isMobile ? 5 : state.selectProps.is4k ? 40 : 20,
    }),
    input: (base, state) => ({ 
      ...base, 
      margin: 0,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: !state.hasValue ? 0 : state.selectProps.is4k ? 60 : 30,
      color: state.selectProps.isDark ? '#ffffff' : '#1c3130',
    }),
    indicatorSeparator: (base) => ({ ...base, display: 'none' }),
    indicatorsContainer: (base, state) => ({
      ...base, 
      padding: '2px 4px',
      // padding: state.selectProps.is4k ? 15 : 5,
      // paddingLeft: state.selectProps.isMobile ? 0 : state.selectProps.is4k ? 10 : 5,
      opacity: 0.33
    }),
  }

  function getOptionBg() {
    if (props.isDark) {
      return '#1c3130'
    } else {
      return '#f6faf6'
    }
  }

  return (
    <Select 
      className="cust-select" 
      value={options.find((country) => country.value === props.value)}
      onChange={props.setValue}
      options={options} 
      components={{ 
        Option: CustomOption, 
        SingleValue: CustomSingleValue, 
        DropdownIndicator: CustomDropdownIndicator,
        Placeholder: CustomPlaceholder
      }}
      isDark={props.isDark}
      isMobile={props.width < 768}
      is4k={props.width >= 3400}
      placeholder={props.placeholder}
      styles={customStyles}
    />
  )
}

export default CustomSelect;
