package com.nassim.cloudinary.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
public class CloudinaryService {
    Cloudinary cloudinary;

    public CloudinaryService() {
        Map<String, String> valuesMap = new HashMap<>();
        valuesMap.put("cloud_name", "dxcsnwzxa");
        valuesMap.put("api_key", "299894676526787");
        valuesMap.put("api_secret", "bo-t37FKqTE5rixWx9ZAke43ywk");
        cloudinary = new Cloudinary(valuesMap);
    }

   @SuppressWarnings("unchecked")
   public Map<String, Object> upload(MultipartFile multipartFile) throws IOException {
        File file = convert(multipartFile);
        
        Map<String, Object> result = (Map<String, Object>)cloudinary.uploader().upload(file, ObjectUtils.emptyMap());
        if (!Files.deleteIfExists(file.toPath())) {
            throw new IOException("Falló la eliminación del archivo temporal: " + file.getAbsolutePath());
        }
        return result;
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> delete(String id) throws IOException {
        return  cloudinary.uploader().destroy(id, ObjectUtils.emptyMap());
    }

    private File convert(MultipartFile multipartFile) throws IOException {
        File file = new File(Objects.requireNonNull(multipartFile.getOriginalFilename()));
        FileOutputStream fo = new FileOutputStream(file);
        fo.write(multipartFile.getBytes());
        fo.close();
        return file;
    }

}
