module ElementsHelper
	def element_configuration(element_electron_configuration)
	  if element_electron_configuration
	    elec_config_element = element_electron_configuration
	    length = elec_config_element.length-2
	    new_conf = elec_config_element.clone
	    if_need_sup = false 
	    new_conf_pos = 0
	    for k in 0..length
	      if if_need_sup
	        new_conf_pos += 11
	      end

	      if (elec_config_element[k] == 's' || elec_config_element[k] == 'p') && elec_config_element[k+1].to_i < 10
	        new_conf[new_conf_pos+1] = '<sup>'+elec_config_element[k+1]+'</sup>'
	        if_need_sup = true
	      elsif elec_config_element[k] == 'd' && elec_config_element[k+1].to_i < 10 && elec_config_element[k+2] == '0' 
	        new_conf[new_conf_pos+1] = '<sup>'+ elec_config_element[k+1]
	        new_conf[new_conf_pos+7] = elec_config_element[k+2] +'</sup>'
	        if_need_sup = true
	      elsif elec_config_element[k] == 'd' && elec_config_element[k+1].to_i < 10
	        new_conf[new_conf_pos+1] = '<sup>'+elec_config_element[k+1] +'</sup>'
	        if_need_sup = true
	      elsif elec_config_element[k] == 'f' && elec_config_element[k+1].to_i < 10 && elec_config_element[k+2].to_i < 5
	        new_conf[new_conf_pos+1] = '<sup>'+elec_config_element[k+1]
	        new_conf[new_conf_pos+7] = elec_config_element[k+2] +'</sup>'
	        if_need_sup = true
	      elsif elec_config_element[k] == 'f' && elec_config_element[k+1].to_i < 10
	        new_conf[new_conf_pos+1] = '<sup>'+elec_config_element[k+1] +'</sup>'
	        if_need_sup = true
	      else 
	        if_need_sup = false
	      end
	      new_conf_pos += 1
	    end
	    new_conf.html_safe
	  else
	  	''
	  end
	end

	def round_to_x_decimals(num,x)
		num.to_f.round(x)
	end
end
