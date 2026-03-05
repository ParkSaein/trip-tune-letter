package com.example.triptuneletter.service

import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.nio.file.Files
import java.nio.file.Paths
import java.nio.file.StandardCopyOption
import java.util.*

@Service
class FileService {
    private val uploadDir = Paths.get(System.getProperty("user.dir"), "uploads").toAbsolutePath()

    init {
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir)
        }
    }

    fun saveFiles(files: List<MultipartFile>): List<String> {
        return files.filter { !it.isEmpty }.map { file ->
            val originalFilename = file.originalFilename ?: "file"
            // 파일명 산처리 (공백 및 특수문자 제거)
            val sanitizedName = originalFilename.replace(Regex("[^a-zA-Z0-9._-]"), "_")
            val fileName = "${UUID.randomUUID()}_$sanitizedName"
            val destPath = uploadDir.resolve(fileName)

            file.inputStream.use { input ->
                Files.copy(input, destPath, StandardCopyOption.REPLACE_EXISTING)
            }
            fileName
        }
    }

    fun getFile(fileName: String): File {
        val filePath = uploadDir.resolve(fileName)
        val file = filePath.toFile()
        if (!file.exists()) {
            throw IllegalArgumentException("File not found: $fileName")
        }
        return file
    }

    fun deleteFiles(fileNames: List<String>) {
        fileNames.forEach { fileName ->
            val filePath = uploadDir.resolve(fileName)
            try {
                Files.deleteIfExists(filePath)
            } catch (e: Exception) {
                // 로그를 남기거나 예외 처리를 할 수 있습니다.
                println("Failed to delete file: $fileName, error: ${e.message}")
            }
        }
    }
}
